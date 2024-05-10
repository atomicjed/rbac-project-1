import {Component, OnDestroy} from '@angular/core';
import {Validators} from "@angular/forms";
import {AddUserService} from "@app/services/api-requests/users/add-user.service";
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";
import {GetUserService} from "@app/services/api-requests/users/get-user.service";
import {catchError, from, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";

interface NewUser {
  userId: string,
  role: string,
}
@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.css'
})

export class CreateAccountPageComponent implements OnDestroy {
  user: any;
  role: string = '';
  error: boolean = false;
  form = this.customFormBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
  constructor(private customFormBuilder: CustomFormBuilder, private firebaseAuthService: FirebaseAuthService,
              private addUserService: AddUserService, private getUserService: GetUserService, private router: Router) {
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
    this.user = user;
  })

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  createAccount() {
    const emailControl = this.form.get('email')?.value;
    const passwordControl = this.form.get('password')?.value;

    from(this.firebaseAuthService.signUp(emailControl, passwordControl)).pipe(
      switchMap(userCredentials => {
        if (userCredentials.user?.uid) {
          const newUser: NewUser = {
            userId: userCredentials.user.uid,
            role: this.role,
          }
          return this.addUserService.addNewUser(newUser);
        }
          throw new Error('No user ID!');
      }),
      tap(response => {
        this.getUserService.getUserAndUpdateStore(response.userId).subscribe();
        this.router.navigate([""]).then();
      }),
      catchError(error => {
        console.log("Error creating account:", error);
        this.error = true;
        throw error;
      })
    ).subscribe();
  }

  handleSelectedRole(selectedRole: string) {
    this.role = selectedRole;
  }
}
