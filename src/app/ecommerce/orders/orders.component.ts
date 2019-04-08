import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent implements OnInit {
    public collection : any;
    public hisID:number;

    public dana = [];
    
    constructor( private dataService : DataService, private notif : NotificationService ){}

    updateFilter(event) {
      const val = event.target.value.toLowerCase();
      console.log("tape :"+ val);
      const temp = this.dana.filter(function(d) {
        return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.collection = temp;
    }

    ngOnInit(){
      this.getData();
    }

    getData(){
      this.dataService.getInventaire()
      .subscribe( (Data) => { this.collection = Data.article;
                              this.dana = this.collection;
                              console.log(JSON.stringify(Data))
      })
    }

    deleteItem(id:number, table:string){
      this.dataService.deleteItem({id:id, table: table})
      .subscribe( (Data) => { 
        console.log(JSON.stringify(Data))
        if(Data.stat){
          this.notif.info("Article bien supprimé !");
        }else{
          this.notif.info("Erreur de suppression !");
        }
        this.getData();
      });
    }


}
