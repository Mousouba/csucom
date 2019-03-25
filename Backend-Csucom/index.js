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
        //if(req.session.csucom){
            let info = {};
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
            info.listeOb = listeOb
            res.json({success:true, user: me, info:info})
        //}
        /*else{
            res.json({success:false, user: null})
        }*/
    });
    api.get('/medecin', async (req, res)=>{
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
        let info = await User.getAllMedecin();
        res.json({success:true, user: me, info:info})
    })
    api.get('/observ', async (req, res)=>{
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
        let info = await User.getAllObservation();
        let chambre = await User.getAllChambre();
        let lit = await User.getAllLit();
        res.json({success:true, user: me, info:info, chambre:chambre, lit:lit})
    })

    
    api.get('/pres', async (req, res)=>{
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
        let info = await User.getAllPrescriction();
        res.json({success:true, user: me, info:info})
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


    api.get('/journal', async (req, res)=>{
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
        let article = await User.getJournal();
        res.json({success:true, user: me, article:article})
    })

    api.post('/login', async (req, res) =>{
        req.check('user', "Email Invalide").isEmail();
        req.check('pass', "On ne Valide Pas ce Genre de Mot de passe").isAlphanumeric() //.matches(/^(?=.*[^a-zA-Z0-9])$/);

        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
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
        //res.render(`${__dirname}/public/form.twig`, { user: "nil" })
    });
    api.post('/fm', async (req, res) =>{
        req.check('name', "Nom Invalide").notEmpty();

        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
           let name = req.body.name;
            const personC = await User.setFamille(name);
            const all = await User.getFamille();
           if (!isErr(personC)){
               res.json({stat: false, all: all});
           }
           else{
               res.json({stat: true, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
           }
        }
    });

    api.post('/art', async (req, res) =>{
        req.check('libelle', "libelle Invalide").notEmpty();
        req.check('describes', "describes Invalide").notEmpty();
        req.check('date_peremption', "date Peremption Invalide").notEmpty();
        req.check('priceAchat', "prix Achat Invalide").isInt();
        req.check('priceVente', "prix Vente Invalide").isInt();
        req.check('qtes', "quantitée Invalide").isInt();
        const error = req.validationErrors();
        if(error){
            res.json({ errors: error })
        }
        else{
           let libelle = req.body.libelle;
           let describes = req.body.describes;
           let date_peremption = req.body.date_peremption;
           let priceAchat = req.body.priceAchat;
           let priceVente = req.body.priceVente;
           let qtes = req.body.qtes;
           let famille_id = req.body.famille_id
           const ref = Math.floor(Math.random() * Math.floor(9999));
           const personC = await User.setArticle(libelle, describes,priceAchat, priceVente,qtes,condition,famille_id,date_peremption,ref);
           if (!isErr(personC)){
               res.json({stat: false, all: personC});
           }
           else{
               res.json({stat: true, error: 'Identification Echoué. Veuillez verifier vos cordonnées' })
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