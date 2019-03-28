import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

declare var require: any;
const data: any = require('./correction.json');

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.css']
})
export class CorrectionComponent implements OnInit {

  public collection:[any];
 
  constructor( private dataService : DataService) { }

  ngOnInit(){
    this.dataService.getInventaire()
    .subscribe( (Data) => { this.collection = Data.article;
                            console.log(JSON.stringify(this.collection)) 
    })
  }
  

}
