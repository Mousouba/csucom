import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.css']
})
export class CaisseComponent implements OnInit {

  public collection:any;
  public service:any;
  public dana = [];
  public updateFilter:any;



  constructor(private dataService:DataService) {}

  ngOnInit(){
    this.dataService.getPres()
    .subscribe( (Data) => { this.collection = Data.info;
      this.dana = this.collection;
      console.log('DATA DIRECT ' + JSON.stringify(Data))}
    );

    this.dataService.getService()
    .subscribe( (Data) => { this.service = Data.info;
      console.log(JSON.stringify(Data))
    }
    );
  }

  onChange(event) {
    const val = event.target.value.toLowerCase();
    console.log("tape :"+ val);
    const temp = this.dana.filter(function(d) {
      return d.service.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
  }
  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
   }
}
