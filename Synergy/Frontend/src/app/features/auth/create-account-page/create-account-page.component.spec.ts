import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateAccountPageComponent } from './create-account-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseAuthService} from "../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../mocks/mock-firebase-auth";
import {DropdownComponent} from "../../../shared-components/dropdown/dropdown.component";
import {SharedComponentsModule} from "../../../shared-components/shared-components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {CustomFormBuilder} from "../../../shared-components/custom-form-group/custom-form-group";
import {AddUserService} from "../../../services/api-requests/users/add-user.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

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
      imports: [HttpClientTestingModule, SharedComponentsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    addUserService = TestBed.inject(AddUserService);
    spy = spyOn(addUserService, 'addNewUser').and.returnValue(of(['1', '2']));
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

  it('should create user object when create account clicked', fakeAsync(() => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('123456789ten!');
    component.role = "Player";

    fixture.detectChanges();

    spyOn(router, 'navigate')

    component.createAccount();

    tick();

    expect(addUserService.addNewUser).toHaveBeenCalledWith({
      userId: 'mocked-user-id',
      role: 'Player'
    });
  }));
});
