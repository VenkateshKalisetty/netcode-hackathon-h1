import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatRoomService } from '../chat-room.service';

@Component({
  selector: "app-manage-room",
  templateUrl: "./manage-room.component.html",
  styleUrls: ["./manage-room.component.scss"],
})
export class ManageRoomComponent implements OnInit {
  displayedColumns: string[] = ["sno", "name", "action"];
  dataSource: IRoom[] = [];
  showAddUser: boolean = false;
  newUser: FormControl = new FormControl("");

  constructor(
    private router: Router,
    private chatService: ChatRoomService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllChatRooms();
  }

  navigateToRoom(room: IRoom) {
    this.router.navigate(["chat"]);
  }

  getAllChatRooms() {
    this.chatService.getAllChatRoomsData().subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => {
        console.log(err);
          this.snackBar.open(err.error.msg, '', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
      }
    )
  }

  addNewChatRoom() {
    if(this.newUser.valid && this.newUser.value) {
      this.chatService.addNewChatRoom(this.newUser.value).subscribe(
        (res) => {
          this.showAddUser = false;
          this.newUser.setValue('');
          this.dataSource = [res, ...this.dataSource];
        },
        (err) => {
          console.log(err);
          this.snackBar.open(err.error.msg, '', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      )
    }
  }

  deleteChatRoom(room: IRoom) {
    let msg = "";
    this.chatService.deleteChatRoom(room.id).subscribe(
      (res) => {
        msg = "Chat Room deleted";
        const index = this.dataSource.findIndex((v) => v.id === room.id);
        this.dataSource.splice(index, 1);
        this.dataSource = this.dataSource.slice();
      },
      (err) => {
        console.log(err);
        msg = err.error.msg;
      },
      () => 
        this.snackBar.open(msg, "", {
          duration: 5000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
        })
    );
  }
}

export interface IRoom {
  id: number;
  name: string;
  ownerId: number;
}