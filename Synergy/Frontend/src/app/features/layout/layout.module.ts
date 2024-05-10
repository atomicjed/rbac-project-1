import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {SharedComponentsModule} from "@app/shared-components/shared-components.module";



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedComponentsModule
  ]
})
export class LayoutModule { }
