import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit{

  public data: any;
  constructor( private dataService: DataService, private notif : NotificationService) {}

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.dataService.getFamille()
    .subscribe((Data) => {
      this.data = Data.data;
    },
    (error) => {
     console.log("erreur")
    })
  }

  onSubmit(ngForm: NgForm){
     this.dataService.setFamille(ngForm.value)
     .subscribe((Data) => {
      console.log(JSON.stringify(Data));
      this.data = Data.all;
      this.notif.info("Famille bien enregistrée !");
     },
     (error) => {
      console.log("erreur");
      this.notif.info("Erreur d'enregistrement !");
     })
  }

  deleteItem(id:number, table:string){
    this.dataService.deleteItem({id:id, table: table})
    .subscribe( (Data) => { 
      this.notif.info("Famille bien supprimée !");
      this.getData();
    },
    (error) => {
     console.log("erreur");
     this.notif.info("Erreur de suppression !");
    })
    
  }
}
