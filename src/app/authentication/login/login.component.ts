import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor() {}

  loginform = true;
  recoverform = false;

  showRecoverForm() {
  	this.loginform = !this.loginform;
  	this.recoverform = true;
  }
  
  showRecoverForm1() {
  	this.loginform = !this.loginform;
  	this.recoverform = false;
  }

}
