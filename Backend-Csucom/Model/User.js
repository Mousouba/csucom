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
            db.query("SELECT id FROM gestionnaire WHERE (pseudo = ? OR email = ?) AND pass = ?", [login, login, password])
                .then((result)=>{
                    if (result[0] !== undefined){
                        db.query("UPDATE gestionnaire SET login_date = NOW() WHERE gestionnaire.id = ?", [parseInt(result[0].id, 10)])
                            .then((results)=>{
                                db.query("SELECT * FROM gestionnaire WHERE id = ?", [parseInt(result[0].id, 10)])
                                    .then((result)=> {
                                        next(result);
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
            db.query("SELECT *, COUNT(id) totalClient FROM client")
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getAllPatient(){
        return new Promise((next)=>{
            db.query("SELECT * FROM client ORDER BY id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getMaxPatientID(){
        return new Promise((next)=>{
            db.query("SELECT MAX(id) lastID FROM client ORDER BY id DESC")
            .then((result)=>{
                next(result);
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
    
    static getAllService(){
        return new Promise((next)=>{
            db.query("SELECT * FROM service ORDER BY name ASC")
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

    static getAllArticleInventaire(){
        return new Promise((next)=>{
            db.query("SELECT *, ph_famille.name sa_famille FROM ph_article LEFT JOIN ph_famille ON ph_famille.id = famille_id ORDER BY ph_famille.name ASC")
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

    static getFamille(){
        return new Promise((next)=>{
            db.query("SELECT * FROM ph_famille ORDER BY id DESC")
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static getDes(){
        return new Promise((next)=>{
            db.query("SELECT * FROM designation ORDER BY id DESC")
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


    static setArticle(libelle,priceAchat,priceVente,qtes,conditi,famille_id,date_peremption,ref,date){
        return new Promise((next)=>{
            db.query("INSERT INTO ph_article(libelle,priceAchat,priceVente,qte,conditionnement,date_peremption,ref,famille_id,register_date) VALUES (?,?,?,?,?,?,?,?,?)", [libelle,parseInt(priceAchat, 10),parseInt(priceVente, 10),parseInt(qtes, 10),conditi,date_peremption,ref,parseInt(famille_id, 10),date] )
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static setFamille(name){
        return new Promise((next)=>{
            db.query("INSERT INTO ph_famille(name) VALUES (?)", [name] )
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static setPres(client,service,medecin,libelle,keyGen,date,gestionnaire,ristourne,montant){
        return new Promise((next)=>{
            console.log(client,service,medecin,libelle,keyGen,date,gestionnaire,ristourne,montant)
            db.query("INSERT INTO prescription(`client_id`, `id_service`, `medecin_id`, `designation_id`, `keyGen`, `register_date`, `gestionnaire_id`, `ristourne`, `price`) VALUES (?,?,?,?,?,?,?,?,?)", [client,service,medecin,libelle,keyGen,date,gestionnaire,ristourne,montant] )
            .then((result)=>{
                console.log('A')
                next(result[0]);
            }).catch((err)=>{
                console.log(err)

                next(err)
            })
        })
    }

    static setPatient(name,firstname,sexe,birth_date,number,assure,register_date){
        return new Promise((next)=>{
            db.query("INSERT INTO client(name,firstname,sexe,birth_date,number,assure,register_date) VALUES (?,?,?,?,?,?,?)", [name,firstname,sexe,birth_date,number,assure,register_date] )
            .then((result)=>{
                next(result[0]);
            }).catch((err)=>{
                next(err)
            })
        })
    }

    static setDes(name, service, priceU){
        return new Promise((next)=>{
            db.query("INSERT INTO designation(name, service_id, price_U) VALUES (?,?,?)", [name, parseInt(service, 10), parseInt(priceU, 10)] )
            .then((result)=>{
                db.query("SELECT * FROM designation ORDER BY id DESC")
                .then((ress)=>{
                    next(ress);
                }).catch((err)=>{
                    next(err)
                })
            }).catch((err)=>{
                next(err)
            })
        })
    }


}