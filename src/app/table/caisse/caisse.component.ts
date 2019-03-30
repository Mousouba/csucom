import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.css']
})
export class CaisseComponent implements OnInit {

  private collection:any[];

  constructor(private dataService:DataService) {}

  ngOnInit(){
    return this.dataService.getPres()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["article"]))} );
  }

}
