import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballStandardDropdownComponent } from './football-standard-dropdown.component';
import {SharedComponentsModule} from "../../../../../shared-components/shared-components.module";

describe('FootballStandardDropdownComponent', () => {
  let component: FootballStandardDropdownComponent;
  let fixture: ComponentFixture<FootballStandardDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FootballStandardDropdownComponent],
      imports: [SharedComponentsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballStandardDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit chosen standard when chosen standard selected', () => {
    let selectedStandard: number = -1;
    component.selectedStandard.subscribe(standard => {
      selectedStandard = standard;
    })
    component.setToAmateur();
    expect(selectedStandard).toBe(1);
  })
});
