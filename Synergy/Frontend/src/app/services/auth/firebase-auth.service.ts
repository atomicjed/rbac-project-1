import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  constructor(private afAuth: AngularFireAuth) {
  }

  currentUserSubscription = this.afAuth.authState.subscribe((user: User | null) => {
  this.currentUserSubject.next(user);
})
  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
  }

  signUp(email: string, password: string) {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const userId = userCredentials.user?.uid;
          if (userId) {
            resolve(userId);
          } else {
            reject(new Error('User ID not found'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      // Login successful
    })
      .catch((error) => {
        console.log("Incorrect email or password")
      });
  }
  logout() {
    this.afAuth.signOut()
      .then(() => {
      })
      .catch((error) => {
        console.log("error", error)
      });
  }

  getToken(): Promise<string | null> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return user.getIdToken();
      } else {
        return null;
      }
    })
  }
}
