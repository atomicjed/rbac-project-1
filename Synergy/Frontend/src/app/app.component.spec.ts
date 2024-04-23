import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthService} from "@auth0/auth0-angular";
import {InjectionToken} from "@angular/core";


const auth0ClientToken = new InjectionToken<any>('auth0.client');

describe('AppComponent', () => {

  const authServiceMock = {
    loginWithRedirect: () => {}
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers:[
        { provide: AuthService, useValue: authServiceMock },
        { provide: auth0ClientToken, useValue: {} }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
