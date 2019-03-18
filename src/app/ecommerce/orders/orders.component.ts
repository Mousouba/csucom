import { Component } from '@angular/core';

declare var require: any;
const data: any = require('./order.json');
@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent {
    private collection : [any];
    
    constructor(){
        this.collection = data;
    }
}
