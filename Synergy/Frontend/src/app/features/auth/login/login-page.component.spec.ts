import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {FirebaseAuthService} from "../services/auth/firebase-auth.service";


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let firebaseAuthService: jasmine.SpyObj<FirebaseAuthService>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('FirebaseAuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        { provide: FirebaseAuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    firebaseAuthService = TestBed.inject(FirebaseAuthService) as jasmine.SpyObj<FirebaseAuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
