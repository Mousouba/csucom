import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { PanierService } from 'src/app/service/panier.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit{
    public collection:any;
    public index:number;
    public count:number = 0;
    public prix:number = 0;
    //Pour recherche
    public dana = [];
    
    constructor(private dataService:DataService, 
                private panier: PanierService, 
                private notif : NotificationService,
                private storage: LocalStorageService){}

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
      this.prix = this.prix + this.collection[index].priceVente;
      this.storage.store('prix',this.prix);
      this.storage.store('panier',this.panier.panier);
      this.count = this.panier.panier.length;
      this.notif.info("Article ajouté dans le panier");
      console.log('prix total '+ this.prix);
      console.log('panier '+ JSON.stringify(this.storage.retrieve('panier')));

    }

}
