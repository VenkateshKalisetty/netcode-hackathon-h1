import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SignInGuard } from "./authentication/auth-guard.service";
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ChatComponent } from "./chat-room/chat/chat.component";
import { ManageRoomComponent } from "./chat-room/manage-room/manage-room.component";

const routes: Routes = [
  {
    path: "signin",
    component: SignInComponent,
    canActivate: [SignInGuard],
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [SignInGuard],
  },
  {
    path: "rooms",
    component: ManageRoomComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "chat",
    component: ChatComponent,
    canActivate: [AuthGuard],
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
