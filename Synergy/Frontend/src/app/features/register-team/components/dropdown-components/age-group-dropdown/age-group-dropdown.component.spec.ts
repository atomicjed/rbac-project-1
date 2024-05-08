import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGroupDropdownComponent } from './age-group-dropdown.component';
import {SharedComponentsModule} from "../../../../../shared-components/shared-components.module";

describe('AgeGroupDropdownComponent', () => {
  let component: AgeGroupDropdownComponent;
  let fixture: ComponentFixture<AgeGroupDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgeGroupDropdownComponent],
      imports: [SharedComponentsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeGroupDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
