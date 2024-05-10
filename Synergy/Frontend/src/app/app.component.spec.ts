import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthService} from "@auth0/auth0-angular";
import {InjectionToken} from "@angular/core";
import {NavbarComponent} from "./features/layout/navbar/navbar.component";
import {FirebaseAuthService} from "./services/auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../mocks/mock-firebase-auth";
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "./app.module";
import {NgxsModule} from "@ngxs/store";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        NgxsModule.forRoot([])
      ],
      providers:[
        {provide: FirebaseAuthService, useClass: MockFirebaseAuthService}
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
