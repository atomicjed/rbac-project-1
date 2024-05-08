import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamHomePageComponent} from "./team-home-page/components/team-home-page/team-home-page.component";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {TeamInvitePageComponent} from "./team-invite-pages/components/team-invite-page/team-invite-page.component";
import {AcceptInvitePageComponent} from "./accept-invite-page/accept-invite-page.component";
import {
  AcceptInviteSignInComponent
} from "./accept-invite-page/components/accept-invite-sign-in/accept-invite-sign-in.component";
import {
  AcceptInviteCreateAccountComponent
} from "./accept-invite-page/components/accept-invite-create-account/accept-invite-create-account.component";



@NgModule({
  declarations: [
    TeamHomePageComponent,
    TeamInvitePageComponent,
    AcceptInvitePageComponent,
    AcceptInviteSignInComponent,
    AcceptInviteCreateAccountComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  exports: [
    TeamHomePageComponent,
    TeamInvitePageComponent,
    AcceptInvitePageComponent,
  ]
})
export class TeamPagesModule { }
