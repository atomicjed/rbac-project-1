import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, Subscription, tap} from "rxjs";
import {ValidateInviteCodeService} from "@app/services/api-requests/random-codes/validate-invite-code.service";

interface ValidateInviteCodeBody {
  randomCode: string,
  teamId: string,
}
@Component({
  selector: 'app-accept-invite-page',
  templateUrl: './accept-invite-page.component.html',
  styleUrl: './accept-invite-page.component.css'
})
export class AcceptInvitePageComponent implements OnInit{
  codeIsValid: boolean | null = null;
  routeSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private validateInviteCodeService: ValidateInviteCodeService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const invitationCodeParam = params.get('invitationCode');
      const teamId = params.get('teamId');
      if (invitationCodeParam && teamId)
      {
        const body: ValidateInviteCodeBody = {
          randomCode: invitationCodeParam,
          teamId: teamId,
        };
        this.validateInviteCodeService.ValidateCode(body).pipe(
          tap(response => {
            this.codeIsValid = response;
          }),
          catchError(error => {
            console.log("Error validating invite code:", error);
            throw error;
          })
        ).subscribe();

        sessionStorage.setItem('invitationCode', invitationCodeParam);
        sessionStorage.setItem('teamId', teamId);
      }
    })
  }
}
