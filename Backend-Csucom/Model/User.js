let db, config;
const ent = require('ent');
let fsx = require('fs');


module.exports = (_db, _config) =>{
    db = _db;
    config = _config;
    return User;
}

let User = class {
    static SetUser(num, content, ref, type){
        return new Promise((next)=>{
            db.query("INSERT INTO user (numbers, money, ref, type_id) VALUES (?,?,?,?)", [num, content, ref, parseInt(type,10)])
                .then((results)=>{
                    next(results);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static setMessage(user, admin, content){
        return new Promise((next)=>{
            db.query("INSERT INTO messages (user_id, admin_id, content) VALUES (?,?,?)", [parseInt(user, 10), parseInt(admin, 10), content])
                .then((results)=>{
                    db.query("UPDATE user SET statut = ?, admin_user = ? WHERE id = ?", [1, parseInt(admin, 10), parseInt(user,10)])
                        .then((result)=>{
                            next(result);
                        }).catch((error)=>{
                            next(error);
                    })
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static setPass(me, old, news){
        return new Promise((next)=>{
            db.query("SELECT * FROM admin WHERE id = ? AND pass = ?", [parseInt(me, 10), old])
                .then((results)=>{
                    if(results[0] !== undefined){
                        db.query("UPDATE admin SET pass = ? WHERE id = ?", [news, parseInt(me, 10)])
                            .then((result)=>{
                                next(result);
                            }).catch((error)=>{
                            next(error);
                        })
                    }
                    else{
                        next(new Error("Mauvais User"))
                    }
                }).catch((err)=>{
                next(err);
            });
        });
    }


    static setAdmin(pseudo, password){
        return new Promise((next)=>{
            db.query("INSERT INTO admin (pseudo, pass) VALUES (?,?)", [pseudo, password])
                .then((results)=>{
                    next(results);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getAllInAwait(){
        return new Promise((next)=>{
            db.query("SELECT *, user.id as ident FROM user LEFT JOIN type ON user.type_id = type.id WHERE statut = 0")
                .then((results)=>{
                    next(results);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getUserByMonth(month, years, type){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT user.id) num, AVG(money) moyenne, type.name FROM user LEFT JOIN type ON user.type_id = type.id WHERE MONTH(user.register_date) = ? AND YEAR(user.register_date) = ? AND user.type_id = ?", [parseInt(month,10), parseInt(years,10), parseInt(type,10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getUserByMonth(type){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT user.id) num, AVG(money) moyenne, type.name FROM user LEFT JOIN type ON user.type_id = type.id WHERE user.type_id = ?", [parseInt(type,10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getAllUserByMonth(month, years){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT user.id) as num FROM user WHERE MONTH(user.register_date) = ? AND YEAR(user.register_date) = ?", [parseInt(month,10), parseInt(years,10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getUserByYears(years){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT id) num FROM user WHERE YEAR(register_date) = ? ", [parseInt(years,10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }


    static getAllInfo(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT id) num FROM user")
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getAllInSend(){
        return new Promise((next)=>{
            db.query("SELECT * FROM user LEFT JOIN type ON user.type_id = type.id WHERE statut = 1 ORDER BY user.id DESC")
                .then((results)=>{
                    next(results);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getUserById(id){
        return new Promise((next)=>{
            db.query("SELECT * FROM user WHERE id = ?", [parseInt(id, 10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getAllAdmin(){
        return new Promise((next)=>{
            db.query("SELECT * FROM admin ORDER BY id DESC")
                .then((results)=>{
                    next(results);
                }).catch((err)=>{
                next(err);
            });
        });
    }


    static getNumAdmin(id){
        return new Promise((next)=>{
            db.query("SELECT COUNT(DISTINCT id) as number FROM messages WHERE admin_id = ?", [parseInt(id, 10)])
                .then((results)=>{
                    next(results[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }










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