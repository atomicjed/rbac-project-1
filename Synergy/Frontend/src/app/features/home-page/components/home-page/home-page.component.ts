import {Component, OnDestroy} from '@angular/core';
import {FirebaseAuthService} from "../../../../services/auth/firebase-auth.service";
import firebase from "firebase/compat";
import User = firebase.User;
import {GetUserPermissionsService} from "../../../../services/api-requests/users/get-user-permissions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnDestroy{
  user: User | null = null;
  permissions: string[] = [];
  constructor(private firebaseAuthService: FirebaseAuthService, private getPermissionService: GetUserPermissionsService, private router: Router) {
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
    this.user = user;
    if (user)
      this.getPermissionService.getUserPermissions(user?.uid);
  })
  permissionsSubscription = this.getPermissionService.permissions$.subscribe(permissions => {
    this.permissions = permissions;
  })

  isAuthenticated() {
    this.firebaseAuthService.isAuthenticated();
    this.router.navigate(["/create-account"]);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.permissionsSubscription?.unsubscribe();
  }
}
