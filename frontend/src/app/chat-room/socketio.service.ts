import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { SOCKET_URL } from './../constants';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  constructor() { }

  setupSocketConn() {
    this.socket = io(SOCKET_URL);
  }

  getMessages = (): Observable<any> => {
    return Observable.create((observer) => {
        return this.socket.on('newMessage', (message) => {
            console.log(message);
            observer.next(message);
        });
    });
}

}
