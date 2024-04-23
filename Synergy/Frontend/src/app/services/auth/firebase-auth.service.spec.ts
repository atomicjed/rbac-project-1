import { TestBed } from '@angular/core/testing';
import { FirebaseAuthService } from './firebase-auth.service';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject} from "rxjs";
import firebase from "firebase/compat";

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService;

  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {

    angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', {
      createUserWithEmailAndPassword: Promise.resolve(),
        signInWithEmailAndPassword: Promise.resolve(),
      signOut: Promise.resolve(),
      authState: new BehaviorSubject<firebase.User | null>(null) // Define authState as a BehaviorSubject
    }
    );
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyAbhhf5WYIr7OvRWEFH0exwdpMEBkpvnFE",
          authDomain: "synergy-12a72.firebaseapp.com",
          projectId: "synergy-12a72",
          storageBucket: "synergy-12a72.appspot.com",
          messagingSenderId: "321245664036",
          appId: "1:321245664036:web:6b3b0033e80058649f19b1"
        })
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthSpy}
      ]
    });
    service = TestBed.inject(FirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
