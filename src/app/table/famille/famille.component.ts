import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit{

  public data: any[];
  constructor( private dataService: DataService) {}

  ngOnInit(){
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
     },
     (error) => {
      console.log("erreur")
     })
  }

  onDelete(id:number){ 
    console.log("son id est :"+ id);
  }
}
