import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptInviteSignInComponent } from './accept-invite-sign-in.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule, Store} from "@ngxs/store";
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../../mocks/mock-firebase-auth";
import {TeamPagesModule} from "@app/features/team-pages/team-pages.module";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {AddUserService} from "@app/services/api-requests/users/add-user.service";

describe('AcceptInviteSignInComponent', () => {
  let component: AcceptInviteSignInComponent;
  let fixture: ComponentFixture<AcceptInviteSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptInviteSignInComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([]), TeamPagesModule],
      providers: [{ provide: FirebaseAuthService, useClass: MockFirebaseAuthService },
      CustomFormBuilder,
      AddUserService,
      Store]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptInviteSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
