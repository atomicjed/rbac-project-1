import {Component, OnDestroy} from '@angular/core';
import {Select} from "@ngxs/store";
import {TeamsStateModel} from "../../../../../store/states/teams.state";
import {Observable} from "rxjs";
import {UserStateModel} from "../../../../../store/states/user.state";
import {GetUserService} from "../../../../../services/api-requests/users/get-user.service";

export interface Team {
  id: string;
  teamName: string;
  urlSlug: string;
  standardOfFootball: string;
  ageGroup: string;
  primaryColour: string;
  secondaryColour: string;
  managers: string[];
  players: string[];
  personalTrainers: string[];
}
interface User {
  userId: string,
  role: string,
  permissions: string[],
  teams: string[]
}

@Component({
  selector: 'app-team-home-page',
  templateUrl: './team-home-page.component.html',
  styleUrl: './team-home-page.component.css'
})
export class TeamHomePageComponent implements OnDestroy {
  user: User | null = null;
  teams: Team[] | null = null;
  @Select((state: {user: UserStateModel}) => state.user.loggedInUser)
  user$!: Observable<User>;
  userSubscription = this.user$.subscribe(user => {
    this.user = user;
  })
  @Select((state: {teams: TeamsStateModel}) => state.teams.userTeams)
  userTeams$!: Observable<Team[]>;
  teamsSubscription = this.userTeams$.subscribe(teams => {
    this.teams = teams;
  })

  constructor(private getUserService: GetUserService) {
    if (this.user?.userId)
      this.getUserService.getUserAndUpdateStore(this.user?.userId).subscribe();
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
