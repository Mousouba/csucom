import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent implements OnInit {
    public collection : [any];
    public hisID:number;
    
    constructor( private dataService : DataService ){}

    ngOnInit(){
      this.dataService.getInventaire()
      .subscribe( (Data) => { this.collection = Data.article;
                              console.log(JSON.stringify(this.collection)) 
      })
    }

    delArticle(id:number){
      console.log('son id est : '+id);
    }


}
