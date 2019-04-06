import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-topsell',
  templateUrl: './topsell.component.html'
})
export class TopsellComponent {

@Input() data:any;
  constructor() {}
}
