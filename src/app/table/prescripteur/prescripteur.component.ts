import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-prescripteur',
  templateUrl: './prescripteur.component.html',
  styleUrls: ['./prescripteur.css']
})
export class PrescripteurComponent implements OnInit {
 
  //Pour recherche
  public dana = [];

  public collection:any[];

  constructor( private dataService: DataService) {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("tape :"+ val);
    const temp = this.dana.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
  }
  ngOnInit(){
    return this.dataService.getMedecin()
    .subscribe( (Data) => { this.collection = Data.info;
      this.dana = this.collection;
    },  
    (error) => {
     console.log("erreur")
    });
  }

  imprimer(){
   let printContents = document.getElementById('sectionAimprimer').innerHTML;    
   let originalContents = document.body.innerHTML;      
   document.body.innerHTML = printContents;     
   window.print();     
   document.body.innerHTML = originalContents;
  }
}
