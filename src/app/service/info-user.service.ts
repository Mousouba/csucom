import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {

  public infoUser :any;

  public infoClient :any;

  public isExist : number = 0;

  constructor() { }
}
