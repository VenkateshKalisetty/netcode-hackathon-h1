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
            this.chatRoomId = parseInt(params.get('chatRoomId'));
            this.roomName = params.get('roomName');
            this.chatRoomService.getRoomMessages(this.chatRoomId)
                .subscribe((data) => {
                    this.messages = data;
                });
        });
        this.socketService.setupSocketConn();
    }

    sendMsg() {
        if (this.msgCtrl.value && this.chatRoomId != -1) {
            const message = { 
                msg: this.msgCtrl.value,
                sentBy: this.loggedInUserId,
                id: -1,
            }
            this.socketService.socket.emit('newMessage', message);
            this.messages = [...this.messages, message];
            this.chatRoomService
                .saveMsg(this.msgCtrl.value, this.chatRoomId)
                .subscribe(() => {
                    this.msgCtrl.setValue('');
                }, (err) => {
                    console.log(err);
                })
            
            this.socketService.getMessages().subscribe(
                (res) => {
                    console.log(res)
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    }
}

interface Msg {
    id: number,
    msg: string,
    sentBy: number
}
