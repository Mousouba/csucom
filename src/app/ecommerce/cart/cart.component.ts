import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PanierService } from 'src/app/service/panier.service';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  public collection: any[]
  public total: number = 0;
  public monnaie: number = 0;
  public client: string;

  constructor( private panier: PanierService){}

  ngOnInit(){
    this.collection = this.panier.panier;
    this.calculeTotal();
    console.log("monnaie "+this.monnaie);

  }

  removeItem(index:number){
    this.reCalculeTotal(index);
    this.panier.removeToPanier(index);
    
  }

  calculeTotal(){
    for(let i = 0; i < this.collection.length; i++){
      this.total = this.total + this.panier.panier[i].priceVente;
      console.log(this.panier.panier[i].priceVente)
    }
  }
  
  reCalculeTotal(index:number){
    if(this.collection.length > 0){
      this.total = this.total - this.panier.panier[index].priceVente;
      console.log(index);
    }else{
      this.total = 0;
    }
  }


  

}
