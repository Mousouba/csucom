let db, config;
const ent = require('ent');
let fsx = require('fs');


module.exports = (_db, _config) =>{
    db = _db;
    config = _config;
    return User;
}

let User = class {
    
    static userExist(login,password){
        return new Promise((next) => {
            db.query("SELECT id FROM gestionnaire WHERE email = ? AND pass = ?", [login, password])
                .then((result)=>{
                    if (result[0] !== undefined){
                        db.query("UPDATE gestionnaire SET login_date = NOW() WHERE gestionnaire.id = ?", [parseInt(result[0].id, 10)])
                            .then((results)=>{
                                db.query("SELECT * FROM gestionnaire WHERE id = ?", [parseInt(result[0].id, 10)])
                                    .then((result)=> {
                                        next(result[0]);
                                    }).catch((error) => {
                                    next(error)
                                })
                            }).catch((error) =>{
                            next(error)});
                    }
                    else{
                        next(new Error("Identification echoué Veuillez Recommencer"))
                    }
                }).catch((err) => {
                next(new Error("Erreur"))
            })
        })
    }


    static getTotalPrescription(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) totalPrescription FROM prescription")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }
    static getTotalPatient(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) totalClient FROM client")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getTotalObservation(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) totalObservation FROM observation WHERE etat = 0")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getSumPres(){
        return new Promise((next)=>{
            db.query("SELECT SUM(price) sumPres FROM prescription")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getSumPhar(){
        return new Promise((next)=>{
            db.query("SELECT SUM(encaisse) sumEn FROM ph_journalvente")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getTotalDeficite(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) totalDeficite FROM ph_article WHERE qte < 6")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }
    static getAllMedecin(){
        return new Promise((next)=>{
            db.query("SELECT * FROM medecin ORDER BY name ASC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }
    

    static getAllArticle(){
        return new Promise((next)=>{
            db.query("SELECT * FROM ph_article ORDER BY libelle ASC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllChambre(){
        return new Promise((next)=>{
            db.query("SELECT * FROM chambre ORDER BY libelle ASC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllLit(){
        return new Promise((next)=>{
            db.query("SELECT * FROM lit ORDER BY libelle ASC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllPrescriction(){
        return new Promise((next)=>{
            db.query("SELECT *, prescription.register_date date, prescription.price prix, designation.name desig, medecin.name medecin,  client.name nom, client.firstname prenom FROM prescription LEFT JOIN client ON prescription.client_id = client.id LEFT JOIN medecin ON prescription.medecin_id = medecin.id LEFT JOIN designation ON prescription.designation_id = designation.id ORDER BY prescription.id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getJournal(){
        return new Promise((next)=>{
            db.query("SELECT *, ph_article.libelle libelle,  ph_article.priceVente FROM ph_journalvente LEFT JOIN ph_article ON ph_journalvente.article_id = ph_article.id ORDER BY ph_journalvente.id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllObservation(){
        return new Promise((next)=>{
            db.query("SELECT *, CONCAT(client.name, ' ',client.firstname) nom, observation.id ident FROM observation LEFT JOIN prescription ON  observation.prescription_id = prescription.id LEFT JOIN client ON prescription.client_id = client.id ORDER BY observation.id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllJour(){
        return new Promise((next)=>{
            db.query("SELECT * FROM ph_journalVente LEFT JOIN ph_article ON  ph_journalVente.article_id = ph_article.id ORDER BY ph_journalVente.id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }



    static getAllObservationWithDate(){
        return new Promise((next)=>{
            let current = new Date().getDate();
            db.query("SELECT *, CONCAT(client.name, ' ',client.firstname) nom, DAY(observation.back_date) jr, DATE(observation.back_date) dates, HOUR(observation.back_date) heur, observation.id ident FROM observation LEFT JOIN prescription ON observation.prescription_id = prescription.id LEFT JOIN client ON prescription.client_id = client.id WHERE DAY(observation.back_date) <= ? ORDER BY observation.id DESC", [parseInt(current, 10) + 2])
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }
    static setObservation(prescription_id,ch,lt,sortie){
        return new Promise((next)=>{
            db.query("INSERT INTO observation(prescription_id, chambre, lit, enter_date, back_date) VALUES (?,?,?,NOW(),?)", [parseInt(prescription_id, 10), parseInt(ch, 10), parseInt(lt, 10),sortie] )
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }
}