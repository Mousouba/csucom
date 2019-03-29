import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent implements OnInit {
    public collection : [any];
    public hisID:number;

    public dana = [];
    
    constructor( private dataService : DataService ){}

    updateFilter(event) {
      const val = event.target.value.toLowerCase();
      console.log("tape :"+ val);
      const temp = this.dana.filter(function(d) {
        return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.collection = temp;
    }

    ngOnInit(){
      this.dataService.getInventaire()
      .subscribe( (Data) => { this.collection = Data.article;
                              this.dana = this.collection;
      })
    }

    delArticle(id:number){
      console.log('son id est : '+id);
    }


}
