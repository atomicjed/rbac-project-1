import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateAccountPageComponent } from './create-account-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../mocks/mock-firebase-auth";
import {DropdownComponent} from "@app/shared-components/dropdown/dropdown.component";
import {SharedComponentsModule} from "@app/shared-components/shared-components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {AddUserService} from "@app/services/api-requests/users/add-user.service";
import {of} from "rxjs";
import {Router, RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;

  let addUserService: AddUserService;
  let firebaseAuthSpy: jasmine.Spy;
  let spy: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [CreateAccountPageComponent, DropdownComponent],
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService },
        CustomFormBuilder,
        AddUserService
      ],
      imports: [HttpClientTestingModule, SharedComponentsModule, RouterModule.forRoot([]), ReactiveFormsModule, NgxsModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    addUserService = TestBed.inject(AddUserService);
    spy = spyOn(addUserService, 'addNewUser').and.returnValue(of({userId: "user_id"}));
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
