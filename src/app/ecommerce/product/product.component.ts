import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit{
    public collection:any[];
    public index:number;
    public count:number = 0;
    
    constructor(private dataService:DataService, private panier: PanierService){
    }

    ngOnInit(){
      this.dataService.getArticle()
      .subscribe( (Data) => { this.collection = Data.article;})

      this.count = this.panier.panier.length;
    }

  

    addToCart(index:number){
      this.panier.addToPanier(this.collection[index]);
      this.count = this.panier.panier.length;
    }

}
