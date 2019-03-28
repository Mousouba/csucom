import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { InfoUserService } from 'src/app/service/info-user.service';

@Component({
  selector: 'app-saisiepatient',
  templateUrl: './saisiepatient.component.html',
  styleUrls: ['./saisiepatient.component.css']
})
export class SaisiepatientComponent implements OnInit {
  public collection: any[];
  public medecin: any[];
  public service: any[];
  public designation: any[];
  public ID : number;
  public gestionnaire: number = 1;
  public ristourne: number = 10;
  public montant: number = 0;
  public keyGen: string = "003032";
  constructor( private dataService: DataService, private infoClient : InfoUserService, private infoUser: InfoUserService) {}

  ngOnInit(){
    this.collection = this.infoClient.infoClient;
    this.gestionnaire = this.infoUser.infoUser.id;
    if(!this.gestionnaire){
      this.gestionnaire = 1;
    }
    console.log('Id depuis le service: '+JSON.stringify(this.infoUser.infoUser.id))

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
    }else{
      this.montant = 0;
    }

    if(this.infoClient.isExist == 0){
      return this.dataService.setPatient({name:ngForm.value["name"], firstname:ngForm.value["firstname"] ,sexe:ngForm.value["sexe"],birth_date:ngForm.value["birth_date"],number:ngForm.value["number"],assure:ngForm.value["assure"]})
      .subscribe( (Data) => { 
        this.ID = Data.patient[0].lastID;
        console.log('Peponse data:'+JSON.stringify(Data));
        console.log('POST Response ID last:'+JSON.stringify(Data.patient[0].lastID));
        console.log('son nom est '+ngForm.value["name"] );
        console.log( JSON.stringify(ngForm.value) );
        console.log('Id depuis le service: '+JSON.stringify(this.infoClient.infoClient["id"]))

       },  
      (error) => {
       console.log("erreur")
      }),
      this.dataService.setPres({client:this.ID,service:ngForm.value["service"], medecin:ngForm.value["medecin"] ,libelle:ngForm.value["libelle"],keyGen:this.keyGen,gestionnaire:1,ristourne:this.ristourne,montant:this.montant})
      .subscribe( (Data) => { 
        console.log('Response :'+JSON.stringify(Data));
      });

      
    }else{
      this.ID = this.infoClient.infoClient.id;
      return this.dataService.setPres({client:this.ID,service:ngForm.value["service"], medecin:ngForm.value["medecin"] ,libelle:ngForm.value["libelle"],keyGen:this.keyGen,gestionnaire:1,ristourne:this.ristourne,montant:this.montant})
      .subscribe( (Data) => { 
        console.log('Response :'+JSON.stringify(Data));
      });
    }


      

    
  }
}
