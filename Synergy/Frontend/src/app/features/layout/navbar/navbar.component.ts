import {Component, OnDestroy} from '@angular/core';
import firebase from "firebase/compat";
import User = firebase.User;
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy{
  user: User | null = null;
  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
    this.user = user;
  })

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  logOut() {
    this.router.navigate(['']).then(() => {
      this.firebaseAuthService.logout();
    })
  }
}
