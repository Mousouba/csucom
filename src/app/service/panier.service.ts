import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public panier :any[] = [];
  constructor() { }

  addToPanier(data:any[]){
    this.panier.push(data)
  }

  removeToPanier(index:number){
    this.panier.splice(index,1)
  }
}
