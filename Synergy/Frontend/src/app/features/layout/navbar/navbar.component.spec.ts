import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../mocks/mock-firebase-auth";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
