import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { AuthenticationService } from "../authentication/authentication.service";
import { SOCKET_URL } from './../constants';

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  socket: any;
  constructor(private authService: AuthenticationService) {}

  setupSocketConn() {
    const token = this.authService.getToken();
    this.socket = io(SOCKET_URL, {
      query: {token},
    });
  }
}
