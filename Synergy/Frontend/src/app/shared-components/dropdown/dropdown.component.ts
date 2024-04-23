import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Output() selectedRole = new EventEmitter<string>();
  chosenRole:string = 'Select your role';

  setToPlayer() {
    this.chosenRole = 'Player'
    this.selectedRole.emit(this.chosenRole);
  }
  setToManager() {
    this.chosenRole = 'Manager'
    this.selectedRole.emit(this.chosenRole);
  }
  setToPersonalTrainer() {
    this.chosenRole = 'Personal Trainer'
    this.selectedRole.emit(this.chosenRole)
  }
}
