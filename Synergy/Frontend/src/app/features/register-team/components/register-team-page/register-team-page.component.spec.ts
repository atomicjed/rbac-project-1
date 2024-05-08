import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeamPageComponent } from './register-team-page.component';
import {RegisterTeamModule} from "../../register-team.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseAuthService} from "../../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../mocks/mock-firebase-auth";
import {NgxsModule} from "@ngxs/store";

describe('RegisterTeamPageComponent', () => {
  let component: RegisterTeamPageComponent;
  let fixture: ComponentFixture<RegisterTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterTeamPageComponent],
      imports: [RegisterTeamModule, HttpClientTestingModule, NgxsModule.forRoot([])],
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
