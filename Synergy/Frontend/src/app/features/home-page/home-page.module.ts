import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthModule} from "../auth/auth.module";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterTeamModule} from "../register-team/register-team.module";
import {HeroSectionComponent} from "./components/hero-section/hero-section.component";
import {NgxsModule} from "@ngxs/store";


@NgModule({
  declarations: [
    HomePageComponent,
    HeroSectionComponent,
  ],
    imports: [
        CommonModule,
        AuthModule,
        SharedComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        RegisterTeamModule,
    ],
  exports: [
    HomePageComponent,
    HeroSectionComponent,
  ]
})
export class HomePageModule { }
