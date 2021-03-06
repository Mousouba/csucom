import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastr : ToastrService) { }

  success( message:string, title:string ){
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-center'
    });
  }

  error( message:string, title:string ){
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-center'
    });
  }

  info( message:string, title?:string ){
    this.toastr.info(message, title, {
      positionClass: 'toast-bottom-center'
    });
  }

}
