import {Component, EventEmitter, Output} from '@angular/core';

export interface AgeGroup {
  age: string,
  icon: string
}

export const Junior: AgeGroup = {
  age: "Junior",
  icon: "fa-solid fa-child-reaching"
};

export const Senior: AgeGroup = {
  age: "Senior",
  icon: "fa-solid fa-person-cane"
}

export const Default: AgeGroup = {
  age: "Select an Age Group",
  icon: "fa-solid fa-child-reaching"
}

@Component({
  selector: 'app-age-group-dropdown',
  templateUrl: './age-group-dropdown.component.html',
  styleUrl: './age-group-dropdown.component.css'
})
export class AgeGroupDropdownComponent {
  @Output() selectedAgeGroup = new EventEmitter<number>();
  chosenAge: AgeGroup = Default;

  setToJunior() {
    this.chosenAge = Junior;
    this.selectedAgeGroup.emit(0);
  }
  setToSenior() {
    this.chosenAge = Senior;
    this.selectedAgeGroup.emit(1);
  }
}
