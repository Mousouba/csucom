import { Component, ViewChild, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-prescripteur',
  templateUrl: './prescripteur.component.html',
  styleUrls: ['./prescripteur.css']
})
export class PrescripteurComponent implements OnInit {
  
  collection:any[];
  constructor( private dataService: DataService) {}
  
  ngOnInit(){
    return this.dataService.getMedecin()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["info"]))} );
  }
}
