import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvitePageComponent } from './team-invite-page.component';
import {TeamPagesModule} from "../../../team-pages.module";
import {CustomFormBuilder} from "../../../../../shared-components/custom-form-group/custom-form-group";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseAuthService} from "../../../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../../mocks/mock-firebase-auth";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {BehaviorSubject} from "rxjs";

describe('TeamInvitePageComponent', () => {
  let component: TeamInvitePageComponent;
  let fixture: ComponentFixture<TeamInvitePageComponent>;

  beforeEach(async () => {
    const FirestoreStub = {
      collection: (name: string) => ({
        doc: (_id: string) => ({
          valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
          set: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
        }),
      }),
    };
    await TestBed.configureTestingModule({
      declarations: [TeamInvitePageComponent],
      imports: [TeamPagesModule, HttpClientTestingModule, AngularFirestoreModule],
      providers: [CustomFormBuilder,
        {provide: FirebaseAuthService, useClass: MockFirebaseAuthService},
        {provide: AngularFirestore, useValue: FirestoreStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamInvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
