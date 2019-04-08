import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';
import { InfoUserService } from 'src/app/service/info-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panneau',
  templateUrl: './panneau.component.html',
  styleUrls: ['./panneau.component.css']
})
export class PanneauComponent implements OnInit {

  public lit: any;
  public chambre : any;
  public numb: any;
  public users : any;


  constructor( private dataService : DataService , private notif: NotificationService, private infoUser : InfoUserService, private _route: Router) { }

  ngOnInit() {
    if(this.infoUser.infoUser.user[0].rang != 1){
      this._route.navigate(['dashboard/dashboard1']);
    }
    this.getUser();
  }

  getUser(){
    this.dataService.getAllUser()
    .subscribe( (Data) => { 
      console.log("response "+JSON.stringify(Data));
      this.users = Data.info;
    },  
    (error) => {
     console.log("erreur")
    });

    this.dataService.getObs()
    .subscribe( (Data) => { 
      this.lit = Data.lit; 
      this.chambre = Data.chambre;
      this.numb = this.chambre.length + 1;
      console.log('ch: ' + this.numb)

    })
  }

  onLit(f: NgForm){
    console.log('on lit '+JSON.stringify(f.value));
    console.log('on lit id '+JSON.stringify(f.value.chambre_selected));
    this.dataService.setLit(f.value)
    .subscribe( (Data) => { 
      this.lit = Data.info;
      if(Data.stat){
        this.notif.info("Un lit a été associé à une chambre !");
      }else{
        this.notif.info("Echec d'ajout de lit !");
      }
    });
    //this.getUser();
  }

  onChambre(){
    let num = this.chambre.length + 1;
    this.dataService.setChambre({chambre:'chambre '+ num})
    .subscribe( (Data) => { 
      this.chambre = Data.info
      this.lit = Data.info;
      if(Data.stat){
        this.notif.info("Une chambre a été ajouté !");
      }else{
        this.notif.info("Echec d'ajout de chambre !");
      }
      this.getUser();
    })
  }
// Suppression de lit @param1: id de l'item , @param2: nom_de_la_table
deleteItem(id:number, table:string){
  this.dataService.deleteItem({id:id, table: table})
  .subscribe( (Data) => { 
    console.log(JSON.stringify(Data));
    this.lit = Data.info;
    if(table ==="gestionnaire"){
      if(Data.stat){
        this.notif.info("Un compte a été supprimé !");
      }else{
        this.notif.info("Echec de suppression de compte !");
      }
    }else{
      if(Data.stat){
        this.notif.info("Un lit a été supprimé !");
      }else{
        this.notif.info("Echec de suppression de lit !");
      }
    }
  });
  this.getUser();
}

  

}
