import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.css']
})
export class JournalComponent implements OnInit {

  public collection:any;
  public dana = [];


  constructor(private dataService:DataService) {}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("tape :"+ val);
    const temp = this.dana.filter(function(d) {
      return d.keyGen.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
  }

  ngOnInit(){
    return this.dataService.getJournal()
    .subscribe( (Data) => { this.collection = Data.article; 
      this.dana = this.collection;
    } );
  }
  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
   }
}
