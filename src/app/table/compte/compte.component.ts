import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  constructor(private dataService : DataService, private notif: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    if(!f.value.numero || f.value.numero =="" || f.value.numero == 0){
      f.value.numero = "00 00 00 00"
    }
    return this.dataService.setUser(f.value)
    .subscribe( (Data) => { 
      console.log("response "+JSON.stringify(Data));
      if(Data.stat){
        this.notif.info("Un compte a bien été crée !");
      }else{
        this.notif.info("Echec de creation de compte !");
      }
    },  
    (error) => {
     console.log("erreur")
    })
  }



}
