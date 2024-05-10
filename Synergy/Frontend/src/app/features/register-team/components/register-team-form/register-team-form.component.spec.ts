import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeamFormComponent } from './register-team-form.component';
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RegisterTeamModule} from "../../register-team.module";
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../mocks/mock-firebase-auth";
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";

describe('RegisterTeamComponent', () => {
  let component: RegisterTeamFormComponent;
  let fixture: ComponentFixture<RegisterTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterTeamFormComponent],
      providers: [CustomFormBuilder,
        {provide: FirebaseAuthService, useClass: MockFirebaseAuthService}],
      imports: [HttpClientTestingModule, RegisterTeamModule, RouterModule.forRoot([]), NgxsModule.forRoot([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update the url slug to replace unwanted characters in the team name', () => {
    const urlSlug = component.generateSlug('Burton Joyce U21s');
    fixture.detectChanges();

    expect(urlSlug).toBe('burton-joyce-u21s');
  })
});
