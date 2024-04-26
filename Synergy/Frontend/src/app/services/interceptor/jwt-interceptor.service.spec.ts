import { TestBed } from '@angular/core/testing';

import { JwtInterceptorService } from './jwt-interceptor.service';
import {FirebaseAuthService} from "../auth/firebase-auth.service";
import {MockFirebaseAuthService} from "../../../mocks/mock-firebase-auth";

describe('JwtInterceptorService', () => {
  let service: JwtInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseAuthService, useClass: MockFirebaseAuthService }
      ]
    });
    service = TestBed.inject(JwtInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
