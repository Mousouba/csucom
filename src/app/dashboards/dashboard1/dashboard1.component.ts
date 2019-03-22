import { Component, AfterViewInit, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {

  constructor(private http:HttpClient, private route:Router) {
    this.http.get<any>("http://localhost:2037/api")
        .subscribe( data => {
            if(data['success'] == true){
                route.navigate(['/authentication/login']);
                console.log("verifié !");
            }
        }
    
    this.http.get<any>("http://localhost:2037/api")
        .subscribe( All_data => {
            console.log(All_data);
        }
        
  }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {}
}
