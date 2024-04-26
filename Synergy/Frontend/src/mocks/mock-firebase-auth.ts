import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MockFirebaseAuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {}

  signUp(email: string, password: string) {
    return Promise.resolve({ user: { uid: 'mocked-user-id' }});
  }

  login(email: string, password: string): Promise<void> {
    return Promise.resolve();
  }

  logout(): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<string | null> {
    return Promise.resolve('mockedToken');
  }

  ngOnDestroy(): void {}
}
