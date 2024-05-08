import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, Subscription, tap} from "rxjs";
import {Team} from "../../../../../store/actions/teams.action";
import {GetTeamFromUrlService} from "../../../../../services/teams/get-team-from-url.service";
import {CustomFormBuilder} from "../../../../../shared-components/custom-form-group/custom-form-group";
import {FormGroup, Validators} from "@angular/forms";
import {
  GenerateRandomCodeService
} from "../../../../../services/api-requests/random-codes/generate-random-code.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-team-invite-page',
  templateUrl: './team-invite-page.component.html',
  styleUrl: './team-invite-page.component.css'
})
export class TeamInvitePageComponent implements OnInit, OnDestroy {
  team: Team | null = null;
  urlSlug: string | null = null;
  routeSubscription: Subscription | null = null;
  teamSubscription: Subscription | null = null;
  form!: FormGroup;

  constructor(private customFormBuilder: CustomFormBuilder, private getTeamFromUrlSlugService: GetTeamFromUrlService, private route: ActivatedRoute,
              private generateRandomCodeService: GenerateRandomCodeService, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.form = this.customFormBuilder.group({
      email: ['', Validators.required]
    })
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.urlSlug = params.get('teamUrlSlug');
      if (this.urlSlug) {
        this.teamSubscription = this.getTeamFromUrlSlugService.getTeamByUrlSlug(this.urlSlug).subscribe(team => {
          this.team = team;
        })
      }
    })
  }
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
  }

  createEmailDocument(invitationCode: string) {
    const emailAddressFormControl = this.form.get('email')?.value;
    const invitationUrl = `http://localhost:4200/accept-invitation/${this.team?.id}/${invitationCode}`;
    const acceptLink = `<a href="${invitationUrl}">Accept Invitation</a>`;
    const data = {
      to: [emailAddressFormControl],
      message: {
        subject: `${this.team?.teamName} invitation`,
        text: `You have been invited to join the ${this.team?.teamName} group at Synergy!`,
        html: acceptLink
      }
    };

    this.firestore.collection('mail').add(data)
      .catch(error => {
        console.log('Error adding email document:', error);
      })
  }

  onSubmit() {
    if (this.team?.id) {
      this.generateRandomCodeService.generateRandomCode(this.team?.id).pipe(
        tap(randomCode => {
          this.createEmailDocument(randomCode);
        }),
        catchError(error => {
          console.log("Error generating code:", error)
          throw error;
        })
      ).subscribe();
    }
  }
}
