import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    private test = "yves sa marche";
  public config: PerfectScrollbarConfigInterface = {};

  constructor() {}
}
