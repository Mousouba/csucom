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
let jwt = require('jsonwebtoken');



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


    /*var User = new Schema({
        id: int,
        pseudo: String,
        email: String,
        rang: number,
        number: number,
        etat: number,
    });*/
    app.use(session({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized,
    }));
    app.use(cookieParser());
    app.use(cors())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(expressValidator());
    

    app.use(morgan);

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
      }
    
    api.get('/', async (req, res)=>{
        var token = req.headers['x-access-token'];
        console.log(token)
        if(true){
            /*jwt.verify(token, config.session.secret, async function(err, decoded) {
                if (err) {res.send({stat:false, user: null});}
                else{*/
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
            me = {id: 1, pseudo: "Icore", email: "core.irie@gmail.com"}
            console.log(info)
            res.send({stat:true, user: me, info:info})
                }
              });
            
        /*}else{
            console.log("false INC")
            res.json({stat:false, user: null})
        }
    });*/
    api.get('/medecin', async (req, res)=>{
        let info = await User.getAllMedecin();
        console.log("seesion "+ req.session.csucom)
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
        console.log("Obs " + req.session.csucom)
        res.json({success:true, user: req.session.csucom, info:info, chambre:chambre, lit:lit})
    })

    api.post('/observ', async (req, res)=>{
        console.log(JSON.stringify(req.body));
        const prescription_id = req.body.id;
        const chambre = req.body.chambre;
        const lit = req.body.lit;
        const date = req.body.date;
        const heure = req.body.heure;
        const users = await User.setObservation(prescription_id, chambre, lit, heure, date)
        if(!isErr(users)){
            res.send({stat: true, user: req.session.csucom, info: users});
        } else{
            res.send({stat: false, user: null});
        }
        
    })

    api.post('/user', async (req, res)=>{
        var test = req.body
        const email = test.email;
        const pseudo = test.pseudo;
        const contact = test.contact;
        const level =  test.role;
        let password = crypto.createHmac('sha256', test.mdp).update('I love cupcakes').digest('hex');
        console.log(password)
        const users = await User.setUser(pseudo, email, password, level, contact)
        if(!isErr(users)){
            res.send({stat: true, user: req.session.csucom, info: users})
        } else{
            res.send({stat: false, user: null});
            console.log("err "+isErr);
        }
        
    })
    
    api.get('/user', async (req, res)=>{
        const all =  await User.getUser()
        if(!isErr(all)){
            res.send({stat: true, user:req.session.csucom, info: all})
        }
        else  res.send({stat: true, user:null})

    })
    api.get('/pres', async (req, res)=>{
        let info = await User.getAllPrescriction();
        res.json({success:true, user: req.session.csucom, info:info})
    })

    api.get('/vente', async (req, res)=>{
       
        let article = await User.getAllArticle();
        res.json({success:true, user: req.session.csucom, article:article})
    })

    api.post('/panier', async (req, res)=>{
       console.log(req.body)
       const ele = await User.setPanierInJourn(req.body.client, req.body.keyGen, req.body.monnaie, req.body.gestionnaire_id)
       if(!isErr(ele)){
           for(let i in req.body.panier){
            const Product = await User.setPanierInProduct(req.body.panier[i].id, ele.id);
               if(!isErr(Product)){
                   console.log("Fait pour " + JSON.stringify(Product) + " " + ele.id)
               }
               else{
                console.log("err pour " + val + " " + ele.id)
               }
           }
           
       }
       else{
           console.log(ele)
       }
       //const Pan = await
        /*let article = await User.getAllArticle();
        res.json({success:true, user: req.session.csucom, article:article})*/
    })

    api.get('/inventaire', async (req, res)=>{
        
        let article = await User.getAllArticleInventaire();
        res.json({success:true, user: req.session.csucom, article:article})
    })


    api.get('/journal', async (req, res)=>{
        
        let article = await User.getJournal();
        res.json({success:true, user: req.session.csucom, article:article});
        console.log(article)
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
    api.post('/del', async (req, res)=>{
        console.log(req.body)
        const del = await User.delElement(req.body.table, req.body.id);
        if(!isErr(del)){
            res.send({user: req.session.csucom, stat: true} )
        }
        else{
            res.send({user: req.session.csucom, stat: false} )
        }
    })
    

    api.post('/login', async (req, res) =>{
        req.check('user', "User Invalide").notEmpty();
        req.check('pass', "On ne Valide Pas ce Genre de Mot de passe").isAlphanumeric() //.matches(/^(?=.*[^a-zA-Z0-9])$/);

        const error = req.validationErrors();
        if(error){
            res.json({ error: error })
        }
        else{
           let user = req.body.user;
           let pass = req.body.pass;
           let password = crypto.createHmac('sha256', pass).update('I love cupcakes').digest('hex');
            const personC = await User.userExist(user, password);
           if (!isErr(personC)){
               
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ user:  personC }, config.session.secret, {
                expiresIn:  expiresIn
            });
            res.send({ stat: true, "user":  personC, "access_token":  accessToken, "expires_in":  expiresIn});
        }
           else{
            console.log("again")
            res.json({ stat: false, error: 'Identification Echoué. Veuillez verifier vos cordonnées' });
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
           const personC = await User.setArticle(libelle,priceAchat, priceVente,qtes,cond,famille_id,date_peremption,ref, new Date());
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
           let service = req.body.famille;
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
        console.log(JSON.stringify(req.body));
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
           let client = req.body.client;
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


    api.post('/chambre', async (req, res)=>{
        const ch = await User.setChambre(req.body.chambre);
        if(!isErr(ch)) {
            console.log(ch)
            res.send({stat: true, info:ch})
        }
        else{
            res.send({stat: false})
        }
        
    })
    api.post('/lit', async (req, res)=>{
        const ch = await User.setLit(req.body.lit, req.body.chambre_selected);
        if(!isErr(ch)) {
            console.log(ch)
            res.send({stat: true, info: ch})
        }
        else{
            res.send({stat: false})
        }
    })

    api.post('/corriger', async (req, res)=>{
        const ch = await User.setLit(req.body.lit, req.body.chambre_selected);
        if(!isErr(ch)) {
            console.log(ch)
            res.send({stat: true, info: ch})
        }
        else{
            res.send({stat: false})
        }
    })

    api.get('/chambre', async (req, res)=>{
        const ch = await User.getAllChambre();
        if(!isErr(ch)) res.send({stat: true, info:ch})
        res.send({stat: false})
    })
    api.get('/lit', async (req, res)=>{
        const ch = await User.getAllLit();
        if(!isErr(ch)) res.send({stat: true, info:ch})
        res.send({stat: false})
    })

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
        socket.on('press', async (data)=>{
            console.log("tcheck "+ data);
            io.emit('press', {text: "Bien reçu"})
        })
        
    });
    https.listen(config.port, ()=>{
        console.log('ecoute sur ' + config.port)
    });
}).catch((error) =>{console.log(error.message)});