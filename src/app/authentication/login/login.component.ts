import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { InfoUserService } from 'src/app/service/info-user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public isClick = false;
    
  constructor( private http: HttpClient, private dataService: DataService, 
                                         private route: Router, 
                                         private infoUser: InfoUserService,
                                         private storage: LocalStorageService ) {}

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
    this.isClick = true;
    return this.dataService.authUser(ngForm.value)
    .subscribe( (Data) => { this.queryResponse = Data; 
      setTimeout( () => {
        if(Data.stat == false){
          this.errorMsg = "Connexion échouée. Veuillez vérifier vos coordonnées ";
          this.isClick = false;
          setTimeout(() => {
            this.errorMsg = " ";
          },4000)
        }else{
          this.storage.store('stockage' , Data);
          this.infoUser.infoUser = this.storage.retrieve('stockage');
          console.log('Login '+ JSON.stringify(this.infoUser.infoUser ) );
          this.route.navigate(["/dashboard/dashboard1"]);
        }
      },200)
    })
  }

  

}
