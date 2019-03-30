import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {

  public infoUser = [];

  public infoClient = [];

  public isExist : number = 0;

  constructor() { }
}
