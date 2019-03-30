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

  public collection:any[];
  public dana = [];
 
  constructor( private dataService : DataService) { }

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
  

}
