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
    //Pour recherche
    public dana = [];
    
    constructor(private dataService:DataService, private panier: PanierService){
    }

    updateFilter(event) {
      const val = event.target.value.toLowerCase();
      console.log("tape :"+ val);
      const temp = this.dana.filter(function(d) {
        return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.collection = temp;
      console.log("return :"+JSON.stringify(this.collection))
    }

    ngOnInit(){
      this.dataService.getArticle()
      .subscribe( (Data) => { this.collection = Data.article;
        this.dana = this.collection;
      })

      this.count = this.panier.panier.length;
    }

  

    addToCart(index:number){
      this.panier.addToPanier(this.collection[index]);
      this.count = this.panier.panier.length;
    }

}
