import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAccountPageComponent} from "./features/auth/create-account-page/create-account-page.component";
import {HomePageComponent} from "./features/home-page/components/home-page/home-page.component";
import {isNotAuthenticatedGuard} from "./guards/auth.guard";
import {hasPermissionGuard} from "./guards/can-register-team.guard";
import {
  RegisterTeamPageComponent
} from "./features/register-team/components/register-team-page/register-team-page.component";
import {
  TeamHomePageComponent
} from "./features/team-pages/team-home-page/components/team-home-page/team-home-page.component";
import {
  TeamInvitePageComponent
} from "./features/team-pages/team-invite-pages/components/team-invite-page/team-invite-page.component";
import {AcceptInvitePageComponent} from "./features/team-pages/accept-invite-page/accept-invite-page.component";
import {
  AcceptInviteCreateAccountComponent
} from "./features/team-pages/accept-invite-page/components/accept-invite-create-account/accept-invite-create-account.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create-account', component: CreateAccountPageComponent, canActivate: [isNotAuthenticatedGuard]},
  {path: 'register-team', component: RegisterTeamPageComponent, canActivate: [hasPermissionGuard('can-register-team')]},
  {path: 'my-teams', component: TeamHomePageComponent},
  {path: ':teamUrlSlug/invites', component: TeamInvitePageComponent, canActivate: [hasPermissionGuard('can-register-team')]},
  {path: 'accept-invitation/:teamId/:invitationCode', component: AcceptInvitePageComponent},
  {path: 'accept-invite/create-account', component: AcceptInviteCreateAccountComponent, canActivate: [isNotAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
