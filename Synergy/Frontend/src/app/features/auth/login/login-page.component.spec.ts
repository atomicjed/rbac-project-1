import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {FirebaseAuthService} from "../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../mocks/mock-firebase-auth";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {CustomFormBuilder} from "../../../shared-components/custom-form-group/custom-form-group";


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let formBuilder: FormBuilder;

  let firebaseAuthService: jasmine.SpyObj<FirebaseAuthService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService },
        CustomFormBuilder
      ],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    firebaseAuthService = TestBed.inject(FirebaseAuthService) as jasmine.SpyObj<FirebaseAuthService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should protect email against xss attacks', () => {
    component.form.controls['email'].setErrors({ 'xss': true });
    component.form.controls['email'].markAsTouched();

    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('#xss-message'));
    expect(errorMessage).toBeTruthy();
  })
});
