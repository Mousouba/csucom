import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  messages : Subject<any>;
  constructor(private wsService :WebsocketService ) {
    this.messages = <Subject<any>>wsService
    .connect()
    .map((response: any): any => {
      return response;
    })
  }

  sendMessage(msg){
    this.messages.next(msg);
  }
}
