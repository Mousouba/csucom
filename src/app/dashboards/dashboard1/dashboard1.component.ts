import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
public data = []
public user = {}
public info = {}

title = "yves mick";
  constructor(private dataService: DataService, private route:Router, private http: HttpClient){

     
  }

  ngOnInit() {
    return this.dataService.getData()
      .subscribe( (Data) => { this.data = Data["info"].listeOb; this.user = Data["user"]; this.info = Data["info"]
        console.log('DATA DIRECT ' + JSON.stringify(Data["info"].totalClient))} );
  }

  
  
  ngAfterViewInit() {
    console.log("===A====");
    console.log(this.data); 
  }
}




            
            
