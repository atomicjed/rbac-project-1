import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterTeamFormComponent} from "./components/register-team-form/register-team-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import { RegisterTeamPageComponent } from './components/register-team-page/register-team-page.component';
import { FootballStandardDropdownComponent } from './components/dropdown-components/football-standard-dropdown/football-standard-dropdown.component';
import { AgeGroupDropdownComponent } from './components/dropdown-components/age-group-dropdown/age-group-dropdown.component';
import { ColourPickerModalComponent } from './components/colour-picker-modal/colour-picker-modal.component';



@NgModule({
  declarations: [
    RegisterTeamFormComponent,
    RegisterTeamPageComponent,
    FootballStandardDropdownComponent,
    AgeGroupDropdownComponent,
    ColourPickerModalComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RegisterTeamFormComponent,
    RegisterTeamPageComponent,
  ]
})
export class RegisterTeamModule { }
