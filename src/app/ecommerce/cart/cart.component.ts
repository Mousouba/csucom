import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PanierService } from 'src/app/service/panier.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { InfoUserService } from '../../service/info-user.service';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  public collection: any[]
  public total: number = 0;
  public monnaie: number = 0;
  public client: string;
  public keyGen: string =  Math.floor(Math.random() * 99999 ).toString() ;
  public form = {};

  constructor( private panier: PanierService, private dataService : DataService, private infoUser : InfoUserService){}

  ngOnInit(){
    this.collection = this.panier.panier;
    this.calculeTotal();
    console.log("monnaie "+this.monnaie);
    console.log('Panier :'+ JSON.stringify(this.panier.panier))

  }
  onSubmit(f : NgForm){
    this.dataService.setPanier({client:this.client, keyGen:this.keyGen, monnaie:this.monnaie, panier: this.panier.panier, gestionnaire_id:this.infoUser.infoUser.user[0].id })
    .subscribe( (Data) => { 
      console.log('Data '+JSON.stringify(Data));
    })
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
      this.total = this.panier.panier[index].priceVente -  this.total;
      console.log(index);
    }else{
      this.total = 0;
    }
  }


  

}
