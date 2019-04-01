import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.css']
})
export class ObservationComponent {

  collection:any;
  chambre:any;
  lit:any;

  constructor(private dataService: DataService){

  }

  ngOnInit(){
    this.dataService.getObs()
    .subscribe( (Data) => { this.collection = Data.info; 
                            this.chambre = Data.chambre; 
                            this.lit = Data.lit; 
                            console.log('id '+ JSON.stringify(Data.chambre.id));
                            console.log('id1 '+ JSON.stringify(Data.chambre[0].id));
    })
  }
  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
   }
}
