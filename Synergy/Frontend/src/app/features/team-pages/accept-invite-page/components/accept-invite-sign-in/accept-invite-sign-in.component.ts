import {Component, Input, OnDestroy} from '@angular/core';
import {Validators} from "@angular/forms";
import {Select} from "@ngxs/store";
import {catchError, from, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {UserStateModel} from "../../../../../store/states/user.state";
import {User} from "../../../../../store/actions/user.action";
import {FirebaseAuthService} from "../../../../../services/auth/firebase-auth.service";
import {CustomFormBuilder} from "../../../../../shared-components/custom-form-group/custom-form-group";
import {GetUserService} from "../../../../../services/api-requests/users/get-user.service";
import {DeleteInviteCodeService} from "../../../../../services/api-requests/random-codes/delete-invite-code.service";
import {AddUserToTeamService} from "../../../../../services/api-requests/teams/add-user-to-team.service";

interface AddUserToTeamBody {
  userId: string,
  role: string,
  teamId: string
}

@Component({
  selector: 'app-accept-invite-sign-in',
  templateUrl: './accept-invite-sign-in.component.html',
  styleUrl: './accept-invite-sign-in.component.css'
})
export class AcceptInviteSignInComponent implements OnDestroy {
  @Select((state: { user: UserStateModel }) => state.user.loggedInUser)
  user$!: Observable<User>;
  user: User | null = null;
  error: boolean = false;
  form = this.customFormBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  getUserSubscription: Subscription | null = null;
  userSubscription = this.user$.subscribe(user => {
    this.user = user;
  })


  constructor(private firebaseAuthService: FirebaseAuthService, private customFormBuilder: CustomFormBuilder, private getUserService: GetUserService,
              private addUserToTeamService: AddUserToTeamService, private deleteInviteCodeService: DeleteInviteCodeService, private router: Router) {
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
  }

  async onLogin() {
    const emailControl = this.form.get('email')?.value;
    const passwordControl = this.form.get('password')?.value;

    from(this.firebaseAuthService.login(emailControl, passwordControl))
      .pipe(
        switchMap(userCredentials => {
          if (userCredentials.user?.uid) {
            return this.getUserService.getUserInfo(userCredentials.user?.uid);
          }

          throw new Error('No User id!');
        }),
        switchMap(user => this.addUserToTeam()),
        tap(() => {
          this.deleteInviteCodeAndRemoveSessionStorageItems();
          this.router.navigate(['']);
        }),
        catchError(error => {
          this.error = true;
          console.log("Error signing in invited user", error)
          throw error;
        })
      ).subscribe();
  }

  async addUserToTeam() {
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
}
