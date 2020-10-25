import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService,
  SignInGuardService,
} from './authentication/auth-guard.service';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ChatComponent } from "./chat-room/chat/chat.component";
import { ManageRoomComponent } from "./chat-room/manage-room/manage-room.component";

const routes: Routes = [
  {
    path: "signin",
    component: SignInComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: "rooms",
    component: ManageRoomComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  },
  {
    path: "**",
    redirectTo: "/rooms",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
