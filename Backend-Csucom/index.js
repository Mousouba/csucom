const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
let bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const crypto = require('crypto');
const config = require('./setting/config');
const { isErr } = require('./src/utilitaire_Ryu');
const session = require('express-session');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
var cors = require('cors')


const mysql = require('promise-mysql');

mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
}).then((db) => {
    console.log(`CONNEXION ETABLIE AVEC LA BD`);
    const app = express();
    const https = require('http').createServer(app);
    let io = require('socket.io')(https);
    const api = express.Router();
    const User = require('./Model/User')(db, config);

    app.use(cors())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(expressValidator());
    app.use(session({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized
    }));

 
    
    app.use(cookieParser());
    app.use(morgan);
    
    api.get('/', async (req, res)=>{
        console.log(JSON.stringify(req))
        if(req.session.csucom){
            let info = {};
            
            const NumberPer =  await User.getTotalPrescription();
            const NumberClient =  await User.getTotalPatient();
            const NumberObservation =  await User.getTotalObservation();
            const NumberDeficite =  await User.getTotalDeficite();
            const listeOb =  await User.getAllObservationWithDate();
            const SumPres =  await User.getSumPres();
            const SumPhar =  await User.getSumPhar();
            info.totalClient = NumberClient.totalClient
            info.totalPrescription = NumberPer.totalPrescription
            info.totalObservation = NumberObservation.totalObservation
            info.totalDeficite = NumberDeficite.totalDeficite
            info.totalSumPres = (SumPres.sumPres !== null) ? SumPres.sumPres : 0
            info.SumPhar = (SumPhar.sumEn !== null) ? SumPhar.sumEn : 0
            info.listeOb = listeOb;
            info.user = req.session.csucom
            console.log(req.session.csucom)
            res.json({success:true, user: req.session.csucom, info:info})
        }
        else{
            res.json({success:false, user: null})
        }
    });
    api.get('/medecin', async (req, res)=>{
        let info = await User.getAllMedecin();
        res.json({success:true, user: req.session.csucom, info:info})
    })

    api.get('/service', async (req, res)=>{
        let info = await User.getAllService();
        res.json({success:true, user: req.session.csucom, info:info})
    })

    api.get('/observ', async (req, res)=>{
        
        let info = await User.getAllObservation();
        let chambre = await User.getAllChambre();
        let lit = await User.getAllLit();
        res.json({success:true, user: req.session.csucom, info:info, chambre:chambre, lit:lit})
    })

    
    api.get('/pres', async (req, res)=>{
        
        let info = await User.getAllPrescriction();
        res.json({success:true, user: req.session.csucom, info:info})
    })

    api.get('/vente', async (req, res)=>{
        let me = {
            "id": 1,
            "pseudo": "Icore",
            "email": "core.irie@gmail.com",
            "pass": "cc7b555a56ef4e4dea39c6f376474aa5bcb24232590e85d8db1014a42da78800",
            "rang": 0,
            "register_date": "2019-03-20T09:52:22.000Z",
            "login_date": "2019-03-22T18:36:42.000Z",
            "attempt": 4,
            "etat": 0,
            "numero": null
        }
        let article = await User.getAllArticle();
        res.json({success:true, user: me, article:article})
    })

    api.get('/inventaire', async (req, res)=>{
        
        let article = await User.getAllArticleInventaire();
        res.json({success:true, user: req.session.csucom, article:article})
    })


    api.get('/journal', async (req, res)=>{
        
        let article = await User.getJournal();
        res.json({success:true, user: req.session.csucom, article:article})
    })


    api.get('/fm', async (req, res)=>{
        
        let famille = await User.getFamille();
        res.json({success:true, user: req.session.csucom, data:famille})
    })

    api.get('/patient', async (req, res)=>{
       
        let famille = await User.getAllPatient();
        res.json({success:true, user: req.session.csucom, data:famille})
    })

    api.get('/des', async (req, res)=>{
        
        let famille = await User.getDes();
        res.json({success:true, user: req.session.csucom, data:famille})
    })
    

    api.post('/login', async (req, res) =>{
        req.check('user', "Email Invalide").isEmail();
        req.check('pass', "On ne Valide Pas ce Genre de Mot de passe").isAlphanumeric() //.matches(/^(?=.*[^a-zA-Z0-9])$/);

        const error = req.validationErrors();
        if(error==false){
            res.json({ error: error })
        }
        else{
           let user = req.body.user;
           let pass = req.body.pass;
           let password = crypto.createHmac('sha256', pass).update('I love cupcakes').digest('hex');
            const personC = await User.userExist(user, password);
           if (!isErr(personC)){
               req.session.csucom = personC;
               res.json({stat: true, user:personC});
           }
           else{
               res.json({ stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });
    api.post('/fm', async (req, res) =>{
        req.check('name', "Nom Invalide").notEmpty();

        const error = req.validationErrors();
        console.log('data '+ req.body.name)
        if(error){
            res.json({ errors: error })
        }
        else{
           let name = req.body.name;
            const personC = await User.setFamille(name);
            const all = await User.getFamille();
           if (!isErr(personC)){
               res.json({stat: true, all: all});
           }
           else{
               res.json({stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });

    api.post('/art', async (req, res) =>{
        req.check('libelle', "libelle Invalide").notEmpty();
        req.check('date_peremption', "date Peremption Invalide").notEmpty();
        req.check('priceAchat', "prix Achat Invalide").isInt();
        req.check('priceVente', "prix Vente Invalide").isInt();
        req.check('famille_id', "id famille Invalide").isInt();
        req.check('qtes', "quantitée Invalide").isInt();
        req.check('cond', "Conditionnement Invalide");
        
        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
           let libelle = req.body.libelle;
           let date_peremption = req.body.date_peremption;
           let priceAchat = req.body.priceAchat;
           let priceVente = req.body.priceVente;
           let qtes = req.body.qtes;
           let cond =  req.body.cond;
           let famille_id = req.body.famille_id
           const ref = Math.floor(Math.random() * Math.floor(9999));
           const personC = await User.setArticle(libelle,priceAchat, priceVente,qtes,cond,famille_id,date_peremption,ref, "2019-03-24 14:42:3");
           if (!isErr(personC)){
               res.json({stat: true, all: personC});
           }
           else{
               res.json({stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées', all: personC })
           }
        }
    });


    api.post('/ds', async (req, res) =>{
        req.check('name', "Nom Invalide").notEmpty();
        req.check('priceUnitaire', "prix Invalide").isInt()

        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
           let name = req.body.name;
           let service = req.body.service;
           let priceU = req.body.priceU;
            const personC = await User.setDes(name, service, priceU);
           if (!isErr(personC)){
               res.json({stat: false, all: personC});
           }
           else{
               res.json({stat: true, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });

    api.post('/pres', async (req, res) =>{
        
        req.check('service', "Nom Invalide");
        req.check('medecin', "Nom Invalide");
        req.check('libelle', "Nom Invalide");
        req.check('keyGen', "Nom Invalide");
        req.check('client', "Nom Invalide");
        req.check('montant', "Nom Invalide");
        req.check('gestionnaire', "Nom Invalide");
        req.check('ristourne', "Nom Invalide");

        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
            
           let service = parseInt(req.body.service, 10) ;
           let medecin = parseInt(req.body.medecin, 10);
           let libelle = parseInt(req.body.libelle, 10);
           let keyGen = req.body.keyGen
           let client = parseInt(req.body.client, 10);
           let montant = parseInt(req.body.montant, 10);
           let ristourne = parseInt(req.body.ristourne, 10);
           let gestionnaire = parseInt(req.body.gestionnaire, 10);
           console.log(req.body)
            const personC = await User.setPres(client,service,medecin,libelle,keyGen,"2019-03-20 12:01:13",gestionnaire,ristourne,montant);
            if (!isErr(personC)){
                res.json({stat: true, all: personC});
           }
           else{
               res.json({stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });

    api.post('/saisiepatient', async (req, res) =>{
        
        req.check('name', "Nom Invalide");
        req.check('firstname', "Nom Invalide");
        req.check('sexe', "Nom Invalide");
        req.check('birth_date', "Nom Invalide");
        req.check('number', "Nom Invalide");
        req.check('assure', "Nom Invalide");

        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
           let name = req.body.name;
           let firstname = req.body.firstname;
           let sexe = req.body.sexe;
           let birth_date = req.body.birth_date;
           let number = req.body.number;
           let assure = req.body.assure;
            const personC = await User.setPatient(name,firstname,sexe,birth_date,number,assure,"2018-03-23");
            const persoC = await User.getMaxPatientID();
            if (!isErr(personC)){
                res.json({stat: true, all: personC, patient: persoC});
           }
           else{
               res.json({stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });
    api.get('/logout', async (req, res) => {
        req.session.destroy((err) => {
            console.log(`DESTRUCTION D'UNE SESSION`)
        })
        res.redirect('/login')
    });


    app.use('/api', api);


    /**
     * POur tout ce qui concerne le nom de mes variable, le nommage est individuel...
     * c'est plutôt le nom de fonction et Class qui sont ont des norme à respecter
     * Donc Priez de ne pas vous Concentrer sur mes nom de variable.
     */
    io.on('connection', (socket)=> {
        
    });
    https.listen(config.port, ()=>{
        console.log('ecoute sur ' + config.port)
    });
}).catch((error) =>{console.log(error.message)});