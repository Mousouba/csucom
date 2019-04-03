import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { data } from './table/smart-table/smart-data-table';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  private url = "http://localhost:2037";

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(this.url);

    let observe = new Observable((obser) =>{
      this.socket.on('press', (data)=>{
        console.log('Recieve ' + data);
        obser.next(data)
      })
      return () =>{
        this.socket.disconnect();
      }

    })

    let obser = {
      next: (data:object) =>{
        this.socket.emit('message', JSON.stringify(data) )
      },
    };
    return Rx.Subject.create(obser, observe);
  }
}
