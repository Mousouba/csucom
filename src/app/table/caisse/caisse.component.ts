import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.css']
})
export class CaisseComponent implements OnInit {

  public collection:any[];
 

  constructor(private dataService:DataService) {}

  ngOnInit(){
    return this.dataService.getPres()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["article"]))} );
  }

  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
   }
}
