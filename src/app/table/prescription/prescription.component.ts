import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-test',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  collection:any[];
  //Pour recherche
  public dana = [];

  constructor(private dataService: DataService){}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.dana.filter(function(d) {
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
  }

  ngOnInit(){
    this.dataService.getPres()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["info"]));
      this.dana = this.collection;
    
    } );
  }
}
