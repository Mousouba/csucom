import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    
  constructor( private http: HttpClient ) {}

  loginform = true;
  recoverform = false;
  
  private const apiUrl = "http://localhost:2037/api";

  data = [any];

  showRecoverForm() {
  	this.loginform = !this.loginform;
  	this.recoverform = true;
  }
  
  showRecoverForm1() {
  	this.loginform = !this.loginform;
  	this.recoverform = false;
  }
  
  ngOnInit(){
    this.data = ()  => {return this.http.get(this.apiUrl)}
    
    console.log(this.data);
  }

}
