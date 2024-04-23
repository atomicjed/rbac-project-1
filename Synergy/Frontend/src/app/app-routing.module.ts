import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./features/auth/login/login-page.component";
import {CreateAccountPageComponent} from "./features/auth/create-account-page/create-account-page.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'create-account', component: CreateAccountPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
