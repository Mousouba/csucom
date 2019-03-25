import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-test',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  collection:any[];

  constructor(private dataService: DataService){

  }

  ngOnInit(){
    this.dataService.getPres()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["info"]))} );
  }
}
