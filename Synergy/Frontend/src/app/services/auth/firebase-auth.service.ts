import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {BehaviorSubject, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {GetUserPermissionsService} from "../api-requests/users/get-user-permissions.service";
import {AddUserService} from "../api-requests/users/add-user.service";

interface User {
  userId: string,
  role: string,
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  constructor(private afAuth: AngularFireAuth, private getUserPermissionsService: GetUserPermissionsService, private addUserService: AddUserService) {
  }

  currentUserSubscription = this.afAuth.authState.pipe(
    tap(user => this.currentUserSubject.next(user)),
    switchMap(user => user !== null ? [true] : [false]),
    tap(isAuthenticated => this.isAuthenticatedSubject.next(isAuthenticated))
  ).subscribe();

  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
  }

  signUp(email: string, password: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(userCredentials => {
      if (userCredentials.user?.uid)
        this.getUserPermissionsService.getUserPermissions(userCredentials.user?.uid);
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

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }
  getToken(): Promise<string | null> {
    return this.afAuth.currentUser.then(user => {
        if (user){
        return user.getIdToken();
      } else {
        return null;
      }
    })
  }
}
