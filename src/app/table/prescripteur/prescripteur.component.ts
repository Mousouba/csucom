import { Component, ViewChild, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-prescripteur',
  templateUrl: './prescripteur.component.html',
  styleUrls: ['./prescripteur.css']
})
export class PrescripteurComponent implements OnInit {
  
  collection:any[];
  
  columns = [{ name: 'N°' }, { name: 'Matricule' }, { name: 'Nom' }, { name: 'Prenom' } , { name: 'Cni' }, { name: 'Contact' }, { name: 'Specialite' }, { name: 'Email' }, { name: 'Ville' }];

  @ViewChild(PrescripteurComponent) table: PrescripteurComponent;
  constructor( private dataService: DataService) {}
  
  ngOnInit(){
    return this.dataService.getMedecin()
    .subscribe( (Data) => { this.collection = Data.info; 
      console.log('DATA DIRECT ' + JSON.stringify(Data["info"]))} );
  }
}
