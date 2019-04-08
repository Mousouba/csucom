import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {
  public id;

  constructor( private dataService: DataService, private route : ActivatedRoute) { }

  ngOnInit(){
    (params : Params) => {
      this.id = params["id"]; 
      console.log('son id '+this.id)
    }

    this.dataService.getMedecinPres({id:1})
    .subscribe( (Data) => { 
      console.log(JSON.stringify(Data));
    },  
    (error) => {
     console.log("erreur")
    })
;
  }

  

}
