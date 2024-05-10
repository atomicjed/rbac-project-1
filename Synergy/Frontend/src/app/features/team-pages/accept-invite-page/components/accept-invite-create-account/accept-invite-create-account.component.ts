import {Component, OnInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {catchError, from, Observable, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {Select} from "@ngxs/store";
import {UserStateModel} from "@app/store/states/user.state";
import {User} from "@app/store/actions/user.action";
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {GetUserService} from "@app/services/api-requests/users/get-user.service";
import {DeleteInviteCodeService} from "@app/services/api-requests/random-codes/delete-invite-code.service";
import {AddUserToTeamService} from "@app/services/api-requests/teams/add-user-to-team.service";
import {
  ValidateInviteCodeService
} from "@app/services/api-requests/random-codes/validate-invite-code.service";
import {AddUserService} from "@app/services/api-requests/users/add-user.service";
import {FirebaseAuthService} from "@app/services/auth/firebase-auth.service";

interface NewUser {
  userId: string,
  role: string,
}
interface AddUserToTeamBody {
  userId: string,
  role: string,
  teamId: string
}
interface ValidateInviteCodeBody {
  randomCode: string,
  teamId: string,
}

@Component({
  selector: 'app-accept-invite-create-account',
  templateUrl: './accept-invite-create-account.component.html',
  styleUrl: './accept-invite-create-account.component.css'
})
export class AcceptInviteCreateAccountComponent implements OnInit {
  role: string = "";
  codeIsValid: boolean | null = null;
  @Select((state: { user: UserStateModel }) => state.user.loggedInUser)
  user$!: Observable<User>;
  user: User | null = null;
  form = this.customFormBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  userSubscription = this.user$.subscribe(user => {
    this.user = user;
  })

  constructor(private customFormBuilder: CustomFormBuilder, private firebaseAuthService: FirebaseAuthService, private addUserService: AddUserService,
              private getUserService: GetUserService, private router: Router, private addUserToTeamService: AddUserToTeamService,
              private deleteInviteCodeService: DeleteInviteCodeService, private validateInviteCodeService: ValidateInviteCodeService) {
  }
  ngOnInit() {
    const invitationCode = sessionStorage.getItem('invitationCode');
    const teamId = sessionStorage.getItem('teamId');
    if (invitationCode && teamId) {
      const body: ValidateInviteCodeBody = {
        randomCode: invitationCode,
        teamId: teamId
      }
      this.validateInviteCodeService.ValidateCode(body).pipe(
        tap(response => {
          this.codeIsValid = response
        }),
        catchError(error => {
          console.log("Error validating invite code:", error);
          throw error;
        })
      ).subscribe();
    }
  }

  createAccount() {
    const emailControl = this.form.get('email')?.value;
    const passwordControl = this.form.get('password')?.value;
    from(this.firebaseAuthService.signUp(emailControl, passwordControl)).pipe(
      switchMap(userCredentials => {
        if (userCredentials.user?.uid) {
          const newUser: NewUser = {
            userId: userCredentials.user.uid,
            role: this.role
          }
          return this.addUserService.addNewUser(newUser);
        }
        throw new Error('No user ID!');
      }),
      switchMap(response => {
        return this.getUserService.getUserAndUpdateStore(response.userId);
      }),
      switchMap(user => this.addUserToTeam(user.userId)),
      tap(() => {
        this.deleteInviteCodeAndRemoveSessionStorageItems();
        this.router.navigate(['/my-teams']).then();
      }),
      catchError(error => {
        console.log("Error adding user:", error);
        throw error;
      })
    ).subscribe();
  }

  async addUserToTeam(userId: string) {
    const teamId = sessionStorage.getItem('teamId');
    if (this.user && teamId) {
      const body: AddUserToTeamBody = {
        userId: this.user.userId,
        role: this.user.role,
        teamId: teamId
      };
      this.addUserToTeamService.AddUser(body).pipe(
        catchError(error => {
          console.log("Error adding user to team:", error);
          throw error;
        })
      ).subscribe();
    }
  }

  deleteInviteCodeAndRemoveSessionStorageItems() {
    const inviteCode = sessionStorage.getItem('invitationCode');
    if (inviteCode)
    {
      this.deleteInviteCodeService.deleteInviteCode(inviteCode).pipe(
        tap(() => {
          this.removeCodeFromSessionStorage();
        }),
        catchError(error => {
          console.log("Error deleting invite code:", inviteCode);
          throw error;
        })
      ).subscribe();
    }
  }

  removeCodeFromSessionStorage() {
    sessionStorage.removeItem('invitationCode');
    sessionStorage.removeItem('teamId');
  }


  handleSelectedRole(selectedRole: string) {
    this.role = selectedRole;
  }
}
