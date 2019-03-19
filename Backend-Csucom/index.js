const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
let bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const crypto = require('crypto');
const config = require('./config');
const session = require('express-session');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');


const mysql = require('promise-mysql');

mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
}).then((db) => {
    const User = require('./Model/User')(db, config);
    console.log(`CONNEXION ETABLIE AVEC LA BD`);
    let holdId = null;  // permettant de mettre un drapeau sur le dernier mail traité.
    let moment = 0; //complement du drapeau
    const app = express();
    const api = express.Router();
    const https = require('http').createServer(app);
    let io = require('socket.io')(https);

    app.use(expressValidator());
    app.use(session({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized
    }));
    //app.use(express.static(`${__dirname}/Public`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(morgan);
    
    api.get('/', async (req, res)=>{
        res.json({success:true, message: "Hello world"})
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