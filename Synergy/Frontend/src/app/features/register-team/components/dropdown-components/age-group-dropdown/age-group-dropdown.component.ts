import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-age-group-dropdown',
  templateUrl: './age-group-dropdown.component.html',
  styleUrl: './age-group-dropdown.component.css'
})
export class AgeGroupDropdownComponent {
  @Output() selectedAgeGroup = new EventEmitter<number>();
  chosenAge: string = 'Select an Age Group';

  setToJunior() {
    this.chosenAge = 'Junior';
    this.selectedAgeGroup.emit(0);
  }
  setToSenior() {
    this.chosenAge = 'Senior';
    this.selectedAgeGroup.emit(1);
  }
}
