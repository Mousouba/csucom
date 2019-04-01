import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent {
  private collection:[any];
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ name: 'N°' }, { name: 'Matricule' }, { name: 'Nom' }, { name: 'Prenom' } , { name: 'Cni' }, { name: 'Contact' }, { name: 'Specialite' }, { name: 'Email' }, { name: 'Ville' }];

  @ViewChild(FournisseurComponent) table: FournisseurComponent;
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
     console.log("je passe");
     this.collection = data;
     console.log(this.collection);
     console.log('partie temp');
     console.log(this.temp);
  }
  
 

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
    });
    
    console.log('temp = '+temp);

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
