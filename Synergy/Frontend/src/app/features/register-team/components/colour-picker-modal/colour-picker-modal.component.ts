import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {FormGroup} from "@angular/forms";

interface TeamColours {
  primaryColour: string;
  secondaryColour: string;
}
@Component({
  selector: 'app-colour-picker-modal',
  templateUrl: './colour-picker-modal.component.html',
  styleUrl: './colour-picker-modal.component.css'
})
export class ColourPickerModalComponent {
  @Output() teamColours = new EventEmitter<TeamColours>();
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<ColourPickerModalComponent>, private customFormBuilder: CustomFormBuilder) {
    this.form = customFormBuilder.group({
      primaryColour: ['#0c246a'],
      secondaryColour: ['#20f9c3']
    })
  }

  saveColours() {
    const primaryColourControl = this.form.get('primaryColour');
    const secondaryColourControl = this.form.get('secondaryColour');
    const data: TeamColours = {
      primaryColour: primaryColourControl?.value,
      secondaryColour: secondaryColourControl?.value
    };
    this.teamColours.emit(data);
    this.dialogRef.close();
  }

  getButtonColour() {
    return {
      'background-color': this.form.get('primaryColour')?.value,
      color: this.form.get('secondaryColour')?.value
    };
  }
}
