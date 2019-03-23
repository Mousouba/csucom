import { Component, Input } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html'
})
export class InfocardComponent {
  @Input() data:[];
  constructor() {}

}
