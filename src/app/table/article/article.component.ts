import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public data: any[];
  public hisID:number;

  constructor(private dataService: DataService,  private notif: NotificationService) {}

  ngOnInit(){
    this.dataService.getFamille()
    .subscribe((Data) => {
      this.data = Data.data;
    },
    (error) => {
     console.log("erreur")
    })
  }

  onSubmit(ngForm : NgForm){
    console.log(JSON.stringify(this.data)); 
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].name == ngForm.value.famille_id){
        ngForm.value.famille_id = this.data[i].id;
        break;
      }
    }
    this.dataService.setArticle(ngForm.value)
    .subscribe((Data) => {
      console.log(JSON.stringify(Data));
      if(Data.stat){
        this.notif.info("Article bien enregistré !");
      }else{
        this.notif.info("Echec d'enregistrement !");
      }
     },
     (error) => {
      console.log("erreur");
      this.notif.info("Echec d'enregistrement !");

     })
  }
}
