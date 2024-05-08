import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptInviteCreateAccountComponent } from './accept-invite-create-account.component';
import {TeamPagesModule} from "../../../../../team-pages.module";
import {CustomFormBuilder} from "../../../../../../../shared-components/custom-form-group/custom-form-group";
import {FirebaseAuthService} from "../../../../../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../../../../mocks/mock-firebase-auth";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule} from "@ngxs/store";

describe('AcceptInviteCreateAccountComponent', () => {
  let component: AcceptInviteCreateAccountComponent;
  let fixture: ComponentFixture<AcceptInviteCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptInviteCreateAccountComponent],
      imports: [TeamPagesModule, TeamPagesModule, HttpClientTestingModule, NgxsModule.forRoot([])],
      providers: [
        CustomFormBuilder,
        {provide: FirebaseAuthService, useClass: MockFirebaseAuthService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptInviteCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
