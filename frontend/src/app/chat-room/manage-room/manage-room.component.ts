import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-manage-room",
  templateUrl: "./manage-room.component.html",
  styleUrls: ["./manage-room.component.scss"],
})
export class ManageRoomComponent implements OnInit {
  displayedColumns: string[] = ["sno", "name", "action"];
  dataSource: IRoom[] = ROOMS_DATA;
  showAddUser: boolean = false;
  newUser: FormControl = new FormControl("");

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToRoom(room: IRoom) {
    this.router.navigate(["chat"]);
  }

  addNewChatRoom() {
    this.showAddUser = !this.showAddUser;
  }

  deleteChatRoom(room: IRoom) {
    const index = this.dataSource.findIndex((v) => v.id === room.id);
    this.dataSource.splice(index, 1);
    this.dataSource = this.dataSource.slice();
  }
}

export interface IRoom {
  id: number;
  name: string;
}

const ROOMS_DATA: IRoom[] = [
  { id: 1, name: "room1" },
  { id: 2, name: "room2" },
  { id: 3, name: "room3" },
  { id: 4, name: "room4" },
  { id: 5, name: "room5" },
  { id: 6, name: "room6" },
  { id: 7, name: "room7" },
  { id: 8, name: "room8" },
  { id: 9, name: "room9" },
  { id: 10, name: "room10" },
];