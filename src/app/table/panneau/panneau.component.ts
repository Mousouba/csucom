import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-panneau',
  templateUrl: './panneau.component.html',
  styleUrls: ['./panneau.component.css']
})
export class PanneauComponent implements OnInit {

  public lit: [];
  public chambre : [];
  public users : [];


  constructor( private dataService : DataService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.dataService.getAllUser()
    .subscribe( (Data) => { 
      console.log("response "+JSON.stringify(Data));
      this.users = Data.user;
    },  
    (error) => {
     console.log("erreur")
    });

    this.dataService.getObs()
    .subscribe( (Data) => { 
      this.lit = Data.lit; 
      this.chambre = Data.chambre;

    })
  }

  onLit(f: NgForm){
    console.log('on lit '+JSON.stringify(f.value));
    console.log('on lit id '+JSON.stringify(f.value.chambre_selected));
    this.dataService.setLit(f.value)
    .subscribe( (Data) => { 
      console.log(JSON.stringify(Data))
    });
    this.getUser();
  }

  onChambre(){
    let num = this.chambre.length + 1;
    this.dataService.setChambre({chambre:'chambre '+ num})
    .subscribe( (Data) => { 
      console.log(JSON.stringify(Data));
      this.getUser();
    })
  }
// Suppression de lit @param1: id de l'item , @param2: nom_de_la_table
deleteItem(id:number, table:string){
  this.dataService.deleteItem({id:id, table: table})
  .subscribe( (Data) => { 
    console.log(JSON.stringify(Data));
  });
  this.getUser();
}

  

}
