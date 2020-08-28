import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;
  readonly chatURI: string = "http://localhost:3000"

  constructor() {
    this.socket = io(this.chatURI)
  }


  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }


  emit(eventName: string, data: any) {
    console.log('here');
    this.socket.emit(eventName, data);
  }
}
