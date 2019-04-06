import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';



@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.css']
})
export class ObservationComponent {

  collection:any;
  pres:any;
  filterData:any = [];
  chambre:any;
  lit:any;

  constructor(private dataService: DataService , private notif: NotificationService){

  }

  ngOnInit(){
    this.dataService.getObs()
    .subscribe( (Data) => { this.collection = Data.info; 
                            this.chambre = Data.chambre; 
                            this.lit = Data.lit; 
                            console.log('id '+ JSON.stringify(Data.chambre.id));
                            console.log('id1 '+ JSON.stringify(Data.chambre[0].id));
    })
    this.dataService.getPres()
    .subscribe( (Data) => { this.pres = Data.info; 
      Data.info.forEach((val, key) => {
        console.log(" ICI UN " + JSON.stringify(val))
        
      })
      
    })
  }


  updateFilter(event) {
    let val = event.target.value;
    if(val != ""){
      const temp = this.pres.filter(function(d) {
        return d.keyGen.indexOf(val) !== -1 || !val;
      });
      this.filterData = (temp.length > 0) ? temp : [];
    }
    else{
      this.filterData = [];
    }
  }

  imprimer(){
    let printContents = document.getElementById('sectionAimprimer').innerHTML;    
    let originalContents = document.body.innerHTML;      
    document.body.innerHTML = printContents;     
    window.print();     
    document.body.innerHTML = originalContents;
   }

   onSubmit(f : NgForm){
     console.log(JSON.stringify(f.value))
    this.dataService.setObser({id:this.filterData[0].id, chambre:f.value.chambre, lit:f.value.lit, date: f.value.date, heure: f.value.time})
    .subscribe( (Data) => { 
      console.log(JSON.stringify(Data));
    })
   }

   test(){
    this.notif.success("ceci est mon text", "Mise en observation");
   }
}
