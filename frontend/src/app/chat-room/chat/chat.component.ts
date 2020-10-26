import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { ChatRoomService } from './../chat-room.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { SocketioService } from './../socketio.service';

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
    constructor(
        public router: Router,
        private authService: AuthenticationService,
        private socketService: SocketioService,
        private chatRoomService: ChatRoomService,
        private route: ActivatedRoute
    ) { }
    msgCtrl = new FormControl("");
    messages: Msg[] = [];
    loggedInUserId = -1;
    roomName = 'Chat Room';
    chatRoomId = -1;

    ngOnInit(): void {
        this.loggedInUserId = this.authService.getUser().id;
        this.route.paramMap.subscribe((params) => {
            this.socketService.setupSocketConn();
            this.chatRoomId = parseInt(params.get('chatRoomId'));
            this.roomName = params.get('roomName');
            this.chatRoomService.getRoomMessages(this.chatRoomId)
                .subscribe((data) => {
                    this.messages = data;
                });

            this.socketService.socket.emit('join', this.chatRoomId);
            this.socketService.socket.on(`message`, (message) => {
                this.msgCtrl.setValue('');
                console.log(message)
                this.messages = [...this.messages, message];
            })
        });
    }

    sendMsg() {
        if (this.msgCtrl.value && this.chatRoomId != -1) {
            const message = {
              msg: this.msgCtrl.value,
              chatRoomId: this.chatRoomId,
            };
            this.socketService.socket.emit('newMessage', message);
        }
    }
}

interface Msg {
  msg: string;
  chatRoomId: number;
  sentBy: number;
}
