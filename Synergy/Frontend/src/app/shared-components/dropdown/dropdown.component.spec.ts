import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import {HlmMenuBarComponent} from "@spartan-ng/ui-menu-helm";
import {BrnMenuTriggerDirective} from "@spartan-ng/ui-menu-brain";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent,],
      imports:[HlmMenuBarComponent, BrnMenuTriggerDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chosen role to manager', () => {
    component.setToManager();
    fixture.detectChanges();
    expect(component.chosenRole).toBe('Manager');
  });

  it('should emit chosen role', () => {
    component.setToPlayer();
    fixture.detectChanges();
    component.selectedRole.subscribe(selectedRole => {
      expect(selectedRole).toBe('Player');
    })
    expect(component).toBeTruthy();
  })
});
