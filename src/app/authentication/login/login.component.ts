import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    
  constructor( private http: HttpClient ) {}

  loginform = true;
  recoverform = false;
  
  //apiUrl = "http://localhost:2037/api";
  showRecoverForm() {
  	this.loginform = !this.loginform;
  	this.recoverform = true;
  }
  
  showRecoverForm1() {
  	this.loginform = !this.loginform;
  	this.recoverform = false;
  }
  
  ngOnInit(){
   /* this.http.get<any>("http://localhost:2037/api")
    .subscribe( data => {
      console.log(data);
    })*/
  }

  onSubmit(ngForm: NgForm){
    console.log(ngForm.value);
  }

}
