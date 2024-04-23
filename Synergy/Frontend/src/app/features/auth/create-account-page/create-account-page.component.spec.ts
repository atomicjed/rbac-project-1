import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPageComponent } from './create-account-page.component';
import {FirebaseAuthService} from "../../services/auth/firebase-auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;

  let firebaseAuthService: jasmine.SpyObj<FirebaseAuthService>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('FirebaseAuthService', ['signUp']);

    await TestBed.configureTestingModule({
      declarations: [CreateAccountPageComponent],
      providers: [
        {provide: FirebaseAuthService, useValue: authServiceSpy}
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;
    firebaseAuthService = TestBed.inject(FirebaseAuthService) as jasmine.SpyObj<FirebaseAuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
