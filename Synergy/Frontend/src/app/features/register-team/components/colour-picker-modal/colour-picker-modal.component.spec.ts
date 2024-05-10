import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourPickerModalComponent } from './colour-picker-modal.component';
import {MatDialogRef} from "@angular/material/dialog";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {RegisterTeamModule} from "../../register-team.module";

describe('ColourPickerModalComponent', () => {
  let component: ColourPickerModalComponent;
  let fixture: ComponentFixture<ColourPickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColourPickerModalComponent],
      imports: [RegisterTeamModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        CustomFormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColourPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
