import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import firebase from "firebase/compat";
import User = firebase.User;
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {GetUserService} from "@app/services/api-requests/users/get-user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnDestroy {
  user: User | null = null;
  role: string = '';
  constructor(private firebaseAuthService: FirebaseAuthService, private customFormBuilder: CustomFormBuilder, private getUserService: GetUserService) {
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
  this.user = user;
  });
  form = this.customFormBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  signUp(email: string, password: string) {
    this.firebaseAuthService.signUp(email, password);
  }

  login(email: string, password: string) {
    this.firebaseAuthService.login(email, password).then(userCredentials => {
      if (userCredentials.user?.uid)
      {
        this.getUserService.getUserAndUpdateStore(userCredentials.user?.uid).subscribe();
      }
    });
  }

  logout() {
    this.firebaseAuthService.logout();
  }

  onLogIn() {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    try {
      if (emailControl?.value && passwordControl?.value)
        this.firebaseAuthService.login(emailControl.value, passwordControl.value);
    } catch (error) {
      console.log("Error signing up", error)
    }
  }
}
