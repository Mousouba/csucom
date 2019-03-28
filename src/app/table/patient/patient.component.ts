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

  constructor( private dataService: DataService, private infoClient: InfoUserService, private route: Router) {}
  
  ngOnInit(){
    return this.dataService.getPatient()
    .subscribe( (Data) => { this.collection = Data.data ;
        console.log(JSON.stringify(this.collection[0].id ));
    
    },  
    (error) => {
     console.log("erreur")
    })
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
      this.infoClient.isExist = isExist;
    }
    this.route.navigate(['/tables/saisiepatient']);
  }


}
