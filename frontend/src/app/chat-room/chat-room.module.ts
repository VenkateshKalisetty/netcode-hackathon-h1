import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageRoomComponent } from "./manage-room/manage-room.component";
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [ManageRoomComponent, ChatComponent],
  imports: [CommonModule],
})
export class ChatRoomModule {}
