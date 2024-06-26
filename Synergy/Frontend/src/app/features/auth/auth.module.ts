import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login/login-page.component";
import {CreateAccountPageComponent} from "./create-account-page/create-account-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {ServicesModule} from "../../services/services.module";
import {CustomFormBuilder} from "../../shared-components/custom-form-group/custom-form-group";



@NgModule({
  declarations: [
    LoginPageComponent,
    CreateAccountPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedComponentsModule,
    ServicesModule,
  ],
  providers: [
    CustomFormBuilder
  ],
  exports: [
    LoginPageComponent,
    CreateAccountPageComponent,
  ]
})
export class AuthModule { }
