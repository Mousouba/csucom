import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.css']
})
export class ObservationComponent {

  collection:any[];
  chambre:any[];
  lit:any[];

  constructor(private dataService: DataService){

  }

  ngOnInit(){
    this.dataService.getObs()
    .subscribe( (Data) => { this.collection = Data.info; 
                            this.chambre = Data.chambre; 
                            this.lit = Data.lit; 
    })
  }
}
