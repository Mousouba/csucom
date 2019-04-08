import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PanierService } from 'src/app/service/panier.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { InfoUserService } from '../../service/info-user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  public collection: any;
  public total: number = 0;
  public monnaie: number = 0;
  public client: string;
  public keyGen: string =  Math.floor(Math.random() * 99999 ).toString() ;
  public form = {};

  constructor( private panier: PanierService, 
               private dataService : DataService, 
               private infoUser : InfoUserService,
               private storage: LocalStorageService,
               private notif: NotificationService){}

  ngOnInit(){
    // this.storage.clear('panier');
    // this.storage.clear('prix');
    this.collection = this.storage.retrieve('panier');
    this.total = this.storage.retrieve('prix');

  }
  onSubmit(f : NgForm){
    this.dataService.setPanier({client:this.client, keyGen:this.keyGen, monnaie:this.monnaie, panier: this.collection, gestionnaire_id:this.infoUser.infoUser.user[0].id })
    .subscribe( (Data) => { 
      console.log('Data '+JSON.stringify(Data));
      this.imprimer();
      this.onReset();
    })
  }


  removeItem(index:number){
    console.log('col '+JSON.stringify(this.collection));
    this.collection = this.storage.retrieve('panier');
    this.panier.removeToPanier(index);
    console.log('before '+JSON.stringify(this.panier.panier));
    if(this.collection.length < 1){
      this.total = 0;
    }else{
      this.total = this.storage.retrieve('prix') - this.collection[index].priceVente;
      console.log('col '+JSON.stringify(this.collection));
    }
    this.storage.store('panier',this.panier.panier);
    this.storage.store('prix',this.total);
    this.notif.info("Article a été bien supprimé !");
    
  }

  onReset(){
    this.storage.clear('panier');
    this.storage.clear('prix');
    this.ngOnInit();
    this.panier.panier = [];
  }

  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
  }


  

}
