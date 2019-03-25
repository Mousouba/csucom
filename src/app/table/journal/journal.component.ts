import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.css']
})
export class JournalComponent implements OnInit {

  private collection:any[];

  constructor(private dataService:DataService) {}

  ngOnInit(){
    return this.dataService.getJournal()
    .subscribe( (Data) => { this.collection = Data.article; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["article"]))} );
  }

}
