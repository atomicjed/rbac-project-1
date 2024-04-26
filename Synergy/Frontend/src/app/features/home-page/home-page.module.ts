import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthModule} from "../auth/auth.module";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";


@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        AuthModule,
        SharedComponentsModule,
    ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
