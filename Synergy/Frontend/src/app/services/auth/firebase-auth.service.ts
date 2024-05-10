import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {BehaviorSubject, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {GetUserService} from "../api-requests/users/get-user.service";
import {AddUserService} from "../api-requests/users/add-user.service";
import {Store} from "@ngxs/store";
import {UserActions} from "../../store/actions/user.action";

interface User {
  userId: string,
  role: string,
  permissions: string[]
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  constructor(private afAuth: AngularFireAuth, private getUserService: GetUserService, private store: Store) {
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
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth.signOut()
      .then(() => {
        const removeUser: User = {
          userId: '',
          role: '',
          permissions: []
        }
        this.store.dispatch(new UserActions.SetUser(removeUser))
      })
      .catch((error) => {
        console.log("error", error)
      });
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
