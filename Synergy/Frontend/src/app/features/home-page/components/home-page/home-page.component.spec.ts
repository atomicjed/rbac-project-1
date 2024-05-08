import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import {FirebaseAuthService} from "../../../../services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../../../mocks/mock-firebase-auth";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoginPageComponent} from "../../../auth/login/login-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CustomFormBuilder} from "../../../../shared-components/custom-form-group/custom-form-group";
import {NgxsModule} from "@ngxs/store";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, LoginPageComponent],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterModule.forRoot([]), NgxsModule.forRoot([])],
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService },
        CustomFormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
