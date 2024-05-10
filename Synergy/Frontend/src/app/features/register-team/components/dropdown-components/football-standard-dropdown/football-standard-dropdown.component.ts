import {Component, EventEmitter, Output} from '@angular/core';

export interface Standard
{
  name: string;
  icon: string;
}

export const Grassroots: Standard = {
  name: "Grassroots",
  icon: "fa-solid fa-futbol text-blue-800"
}
export const Amateur: Standard = {
  name: "Amateur",
  icon: "fa-solid fa-futbol text-blue-800"
}
export const SemiProfessional: Standard = {
  name: "Semi Professional",
  icon: "fa-solid fa-futbol text-blue-800"
}
export const Professional: Standard = {
  name: "Professional",
  icon: "fa-solid fa-user-tie text-blue-800"
}
export const Default: Standard = {
  name: "Select a standard",
  icon: "fa-solid fa-futbol text-blue-80"
}

@Component({
  selector: 'app-football-standard-dropdown',
  templateUrl: './football-standard-dropdown.component.html',
  styleUrl: './football-standard-dropdown.component.css'
})
export class FootballStandardDropdownComponent {
  @Output() selectedStandard = new EventEmitter<number>();
  chosenStandard: Standard = Default;

  setToGrassroots() {
    this.chosenStandard = Grassroots;
    this.selectedStandard.emit(0);
  }
  setToAmateur() {
    this.chosenStandard = Amateur;
    this.selectedStandard.emit(1);
  }
  setToSemiProfessional() {
    this.chosenStandard = SemiProfessional;
    this.selectedStandard.emit(2);
  }
  setToProfessional() {
    this.chosenStandard = Professional;
    this.selectedStandard.emit(3);
  }
}
