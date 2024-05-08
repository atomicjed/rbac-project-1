import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-football-standard-dropdown',
  templateUrl: './football-standard-dropdown.component.html',
  styleUrl: './football-standard-dropdown.component.css'
})
export class FootballStandardDropdownComponent {
  @Output() selectedStandard = new EventEmitter<number>();
  chosenStandard: string = 'Select a Standard';

  setToGrassroots() {
    this.chosenStandard = 'Grassroots';
    this.selectedStandard.emit(0);
  }
  setToAmateur() {
    this.chosenStandard = 'Amateur';
    this.selectedStandard.emit(1);
  }
  setToSemiProfessional() {
    this.chosenStandard = 'Semi Professional';
    this.selectedStandard.emit(2);
  }
  setToProfessional() {
    this.chosenStandard = 'Professional';
    this.selectedStandard.emit(3);
  }
}
