import { Component } from '@angular/core';

declare var require: any;
const data: any = require('./product.json');
@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['./product.css']
})
export class ProductComponent {

    public sidebarnavItems: any[];
    
     collection:[any];
    constructor(){
        this.collection = data;
    }
}
