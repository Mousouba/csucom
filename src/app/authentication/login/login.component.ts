import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { InfoUserService } from 'src/app/service/info-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    
  constructor( private http: HttpClient, private dataService: DataService,
                                         private route: Router, 
                                         private infoUser: InfoUserService) {}

  loginform = true;
  recoverform = false;
  
  public queryResponse = [];
  public errorMsg = " ";
  
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

  }

  onSubmit(ngForm: NgForm){ 
    let isClicable = true;
    return this.dataService.authUser(ngForm.value)
    .subscribe( (Data) => { this.queryResponse = Data;
       
      console.log('auth: '+JSON.stringify(Data));

      setTimeout( () => {
        if(Data.stat == false){
          this.errorMsg = "Connexion échouée. Veuillez vérifier vos coordonnées ";
          setTimeout(() => {
            this.errorMsg = " ";
          },4000)
        }else{
          this.infoUser.infoUser = this.queryResponse;
          this.route.navigate(["/dashboard/dashboard1"]);
        }
      },2000)
    })
  }

  

}
