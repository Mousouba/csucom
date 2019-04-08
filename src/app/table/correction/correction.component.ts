import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NgForm } from '@angular/forms';

declare var require: any;
const data: any = require('./correction.json');

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.css']
})
export class CorrectionComponent implements OnInit {

  public collection:any;
  public dana = [];
  public qtes:number;
 
  constructor( private dataService : DataService, private notif : NotificationService) { }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("tape :"+ val);
    const temp = this.dana.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
  }

  ngOnInit(){
    this.dataService.getInventaire()
    .subscribe( (Data) => { this.collection = Data.article;
                            this.dana = this.collection;
    })
  }

  onCorriger(id:number, f: NgForm){
    // this.dataService.setStock({id:id, qtes: f.value.qtes})
    // .subscribe( (Data) => { 
    //   if(Data.stat){
    //     this.notif.info(`Stock ${id} a été bien corrigé !`);
    //   }else{
    //     this.notif.info(`Echec de correction !`);
    //   }
    // })
    alert(this.qtes);
  }
  

}
