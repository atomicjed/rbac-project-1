import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddUserService} from "../../../services/api-requests/users/add-user.service";
import {FirebaseAuthService} from "../../../services/auth/firebase-auth.service";
import {ValidatorsService, xssValidator} from "../../../services/validators/validators.service";
import {GetUserPermissionsService} from "../../../services/api-requests/users/get-user-permissions.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {CustomFormBuilder} from "../../../shared-components/custom-form-group/custom-form-group";
import {AppendFormValidators} from "../../../shared-components/custom-form-group/append-xss-validator.service";

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
  form: FormGroup;
  constructor(private customFormBuilder: CustomFormBuilder, private firebaseAuthService: FirebaseAuthService, private validatorsService: ValidatorsService,
              private addUserService: AddUserService, private getPermissionsService: GetUserPermissionsService, private router: Router) {
    this.form = this.customFormBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
    this.user = user;
  })

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  createAccount() {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    const nameControl = this.form.get('name');
    if(emailControl?.value && passwordControl?.value)
      this.firebaseAuthService.signUp(emailControl.value, passwordControl?.value).then(user => {
        if (user.user?.uid) {
          const newUser: NewUser = {
            userId: user.user.uid,
            role: this.role,
          }
          this.addUserService.addNewUser(newUser).pipe(
            tap(permissions => {
              const permissionsArray = Object.values(permissions);
              this.getPermissionsService.setPermissions(permissionsArray);
              this.router.navigate([""]);
            })
          ).subscribe();
        }
      })
        .catch((error) => {
          console.error('Sign-up error:', error)
        })
  }

  handleSelectedRole(selectedRole: string) {
    this.role = selectedRole;
  }
}
