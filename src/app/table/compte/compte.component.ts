import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    if(!f.value.numero || f.value.numero =="" || f.value.numero == 0){
      f.value.numero = "00 00 00 00"
    }
    return this.dataService.setUser(f.value)
    .subscribe( (Data) => { 
      console.log("response "+JSON.stringify(Data))
    },  
    (error) => {
     console.log("erreur")
    })
  }



}
