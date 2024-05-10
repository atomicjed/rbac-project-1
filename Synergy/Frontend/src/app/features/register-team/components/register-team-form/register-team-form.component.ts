import {Component, OnDestroy} from '@angular/core';
import {CustomFormBuilder} from "@app/shared-components/custom-form-group/custom-form-group";
import {FormGroup, Validators} from "@angular/forms";
import {RegisterTeamService} from "@app/services/api-requests/teams/register-team.service";
import {catchError, Observable, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ColourPickerModalComponent} from "../colour-picker-modal/colour-picker-modal.component";
import {Select} from "@ngxs/store";
import {UserStateModel} from "@app/store/states/user.state";
import {Router} from "@angular/router";

interface Team {
  teamName: string;
  urlSlug: string;
  standardOfFootball: number;
  ageGroup: number;
  primaryColour: string;
  secondaryColour: string;
  managers: string[];
  players: string[];
  personalTrainers: string[];
}
interface RegisterTeamBody {
  userId: string;
  team: Team;
}
interface User {
  userId: string;
  role: string;
  permissions: string[];
}

@Component({
  selector: 'app-register-team-form',
  templateUrl: './register-team-form.component.html',
  styleUrl: './register-team-form.component.css'
})
export class RegisterTeamFormComponent implements OnDestroy {
  user: User | null = null;
  form: FormGroup;
  footballStandard: number = 10;
  ageGroup: number = 10;
  primaryColour: string = '';
  secondaryColour: string = '';
  @Select((state: {user: UserStateModel}) => state.user.loggedInUser)
  user$!: Observable<User>;
  userSubscription = this.user$.subscribe(user => {
    this.user = user;
  })

  constructor(private customFormBuilder: CustomFormBuilder, private registerTeamService: RegisterTeamService, private dialog: MatDialog,
              private router: Router) {
    this.form = this.customFormBuilder.group({
      teamName: ['', Validators.required],
    })
  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  handleSelectedStandard(selectedStandard: number) {
    this.footballStandard = selectedStandard;
  }
  handleSelectedAgeGroup(selectedAgeGroup: number) {
    this.ageGroup = selectedAgeGroup;
  }
  openColourPickerModal() {
    const dialogRef = this.dialog.open(ColourPickerModalComponent);

    dialogRef.componentInstance.teamColours.subscribe(data => {
      this.primaryColour = data.primaryColour
      this.secondaryColour = data.secondaryColour
    })
  }
  displayPrimaryColour() {
    return {
      'background-color': this.primaryColour
    };
  }
  displaySecondaryColour() {
    return {
      'background-color': this.secondaryColour
    }
  }
  generateSlug(teamName: string) {
    return teamName
      .replace(/[^\w\s-/]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/\/+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
  }

  async onSubmit() {
    if (this.user)
    {
      const teamName = this.form.get("teamName")?.value;
      const urlSlug = this.generateSlug(teamName);
      const team: Team = {
        teamName: teamName,
        urlSlug: urlSlug,
        standardOfFootball: this.footballStandard,
        ageGroup: this.ageGroup,
        primaryColour: this.primaryColour,
        secondaryColour: this.secondaryColour,
        managers: [this.user.userId],
        players: [],
        personalTrainers: []
      };
      const body: RegisterTeamBody = {
        userId: this.user.userId,
        team: team
      };
      this.registerTeamService.registerTeam(body).pipe(
        tap(() => {
          this.router.navigate(['my-teams']);
        }),
        catchError(error => {
          console.log("Error", error);
          throw error;
        })
      ).subscribe();
    }
  }
}
