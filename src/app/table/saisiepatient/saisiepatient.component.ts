import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { InfoUserService } from 'src/app/service/info-user.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-saisiepatient',
  templateUrl: './saisiepatient.component.html',
  styleUrls: ['./saisiepatient.component.css']
})
export class SaisiepatientComponent implements OnInit {
  public collection: any;
  public medecin: any;
  public service: any;
  public designation: any;
  public ID : number = 1;
  public gestionnaire: number = 1;
  public ristourne: number = 10;
  public montant: number = 0;
  public keyGen: string =  Math.floor(Math.random() * 99999 ).toString() ;

  constructor( private dataService: DataService, 
               private infoClient : InfoUserService, 
               private infoUser: InfoUserService , 
               private notif: NotificationService,
               private storage: LocalStorageService) {}

  ngOnInit(){
    this.collection = this.infoClient.infoClient;
    this.gestionnaire = this.infoUser.infoUser.user.id;
    if(!this.gestionnaire){
      this.gestionnaire = 1;
    }
    console.log('Id depuis le service 1: '+JSON.stringify(this.infoUser.infoUser.user[0].id));

    return this.dataService.getMedecin()
    .subscribe( (Data) => { 
      this.medecin = Data.info;
     },  
    (error) => {
     console.log("erreur")
    }),
    
    this.dataService.getService()
    .subscribe( (Data1) => { 
      this.service = Data1.info; 
      console.log('data ret :'+JSON.stringify(this.service))
     },  
    (error) => {
     console.log("erreur")
    }),
    this.dataService.getDes()
    .subscribe( (Data2) => { 
      this.designation = Data2.data;
      console.log('data ret :'+JSON.stringify(this.service))
     },  
    (error) => {
     console.log("erreur")
    })
  }

  onSubmit(ngForm: NgForm){

    if(ngForm.value["montant"] > 0){
      this.ristourne = 0;
      this.montant = ngForm.value["montant"]
    }else{
      this.montant = ngForm.value["priceU"];
    }

    if(this.infoClient.isExist == 0){
      this.dataService.setPatient({name:ngForm.value["name"], firstname:ngForm.value["firstname"] ,sexe:ngForm.value["sexe"],birth_date:ngForm.value["birth_date"],number:ngForm.value["number"],assure:ngForm.value["assure"]})
      .subscribe( (Data) => { 
        this.ID = parseInt(Data.patient[0].lastID, 10);
        this.storage.store('id', parseInt(Data.patient[0].lastID, 10));
        console.log("last id "+this.ID);
        if(Data.stat){
          this.notif.info("Patient bien enregistré !");
        }else{
          this.notif.info("Echec d'enregistrement !");
        }
       },  
      (error) => {
       console.log("erreur")
      }),
      this.dataService.setPres({client:this.ID,service:ngForm.value["service"], medecin:ngForm.value["medecin"] ,libelle:ngForm.value["libelle"],keyGen:this.keyGen,gestionnaire:this.gestionnaire,ristourne:this.ristourne,montant:this.montant})
      .subscribe( (Data1) => { 
        console.log("last id 2:  "+this.ID);
        console.log('Response :'+JSON.stringify(Data1));
      });

      
    }else{
      this.ID = this.infoUser.infoUser.user[0].id;
      return this.dataService.setPres({client:this.storage.retrieve('id'),service:ngForm.value["service"], medecin:ngForm.value["medecin"] ,libelle:ngForm.value["libelle"],keyGen:this.keyGen,gestionnaire:this.gestionnaire,ristourne:this.ristourne,montant:this.montant})
      .subscribe( (Data) => { 
        console.log('Response :'+JSON.stringify(Data));
      });
    }
  }

  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
  }
}
