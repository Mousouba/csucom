import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public data: any[];
  public hisID:number;

  constructor(private dataService: DataService) {}

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
     },
     (error) => {
      console.log("erreur")
     })
  }
}
