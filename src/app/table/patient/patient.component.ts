import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { InfoUserService } from 'src/app/service/info-user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.css']
})
export class PatientComponent  implements OnInit {
  
  collection:any[];
  public dana = [];
  public hidden = true;

  constructor( private dataService: DataService, private infoClient: InfoUserService, private route: Router) {}
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("tape :"+ val);
    const temp = this.dana.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.collection = temp;
    console.log('Sa  : '+JSON.stringify(this.collection));
    if(this.collection.length == 0){
      this.hidden = false;
    }else{
      this.hidden = true;
    }
  }

  ngOnInit(){
    this.getData();
  }

  getData(){
    return this.dataService.getPatient()
    .subscribe( (Data) => { this.collection = Data.data ;
        this.dana = this.collection;
    
    },  
    (error) => {
     console.log("erreur")
    })
  }

  navigateToNew(){
    this.infoClient.isExist = 0;
    this.route.navigate(["/tables/saisiepatient"])
  }

  getID(id:number){
    console.log('Son id :'+id);
  }

  getThisClient(id:number, isExist:number){
    
    if(isExist == 1){
      for(let i = 0; i < this.collection.length; i++){
        if(this.collection[i].id == id){
          this.infoClient.infoClient = this.collection[i];
          console.log('Sa data est : '+JSON.stringify(this.infoClient.infoClient ));
          break;
        }
      }
      
    }else{
      this.infoClient.infoClient = [];
    }
    this.infoClient.isExist = isExist;
    this.route.navigate(['/tables/saisiepatient']);
  }

  deleteItem(id:number, table:string){
    this.dataService.deleteItem({id:id, table: table})
    .subscribe( (Data) => { 
      console.log(JSON.stringify(Data));
    });
    this.getData();
  }


}
