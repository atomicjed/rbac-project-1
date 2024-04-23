import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import firebase from "firebase/compat";
import User = firebase.User;
import {AddUserService} from "../../../services/api-requests/users/add-user.service";
import {FirebaseAuthService} from "../../../services/auth/firebase-auth.service";
import {ValidatorsService} from "../../../services/validators/validators.service";

interface NewUser {
  userId: string,
  name: string,
  role: string,
}
@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.css'
})
export class CreateAccountPageComponent implements OnDestroy {
  user: User | null = null!;
  role: string = '';
  constructor(private formBuilder: FormBuilder, private firebaseAuthService: FirebaseAuthService, private validatorsService: ValidatorsService,
              private addUserService: AddUserService) {
  }
  userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
    this.user = user;
  })
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  createAccount() {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    const nameControl = this.form.get('name');
    if(emailControl?.value && passwordControl?.value)
      this.firebaseAuthService.signUp(emailControl.value, passwordControl?.value).then(userId => {
        if (nameControl?.value)
        {
          const newUser: NewUser = {
            userId: userId,
            name: nameControl.value,
            role: this.role,
          }
            this.addUserService.addNewUser(newUser);
        }
        else {
          console.log("Error adding new user")
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
