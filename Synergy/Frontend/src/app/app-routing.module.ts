import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAccountPageComponent} from "./features/auth/create-account-page/create-account-page.component";
import {HomePageComponent} from "./features/home-page/components/home-page/home-page.component";
import {isNotAuthenticatedGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-account', component: CreateAccountPageComponent, canActivate: [ isNotAuthenticatedGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
