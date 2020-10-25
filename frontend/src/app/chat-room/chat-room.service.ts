import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { API_URL } from "../constants";
import { IRoom } from "./manage-room/manage-room.component";

@Injectable({
  providedIn: "root",
})
export class ChatRoomService {
  constructor(private httpClient: HttpClient) {}

  getAllChatRoomsData(): Observable<IRoom[]> {
    return this.httpClient.get<IRoom[]>(`${API_URL}/chat-room`);
  }

  addNewChatRoom(name: string): Observable<IRoom> {
    return this.httpClient.post<IRoom>(`${API_URL}/chat-room`, { name });
  }

  deleteChatRoom(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/chat-room/${id}`);
  }

  saveMsg(msg: string, chatRoomId: number): Observable<any> {
    return this.httpClient.post(`${API_URL}/message`, {msg, chatRoomId});
  }

  getRoomMessages(chatRoomId: number): Observable<any> {
    return this.httpClient.get(`${API_URL}/message/${chatRoomId}`);
  }
}
