import {Component, OnDestroy} from '@angular/core';
import {GetUserService} from "../../../../services/api-requests/users/get-user.service";
import {Select, Store} from "@ngxs/store";
import {UserStateModel} from "../../../../store/states/user.state";
import {Observable} from "rxjs";
import {UserActions} from "../../../../store/actions/user.action";
import {GetTeamsService} from "../../../../services/api-requests/teams/get-teams.service";
import {TeamsStateModel} from "../../../../store/states/teams.state";
import {Team} from "../../../../store/actions/teams.action";

interface LoggedInUser {
  userId: string,
  role: string;
  permissions: string[],
  teams: string[]
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnDestroy {
  userId: string = '';
  permissions: string[] = [];
  teams: Team[] = [];
  @Select((state: { user: UserStateModel }) => state.user.loggedInUser)
  loggedInUser$!: Observable<LoggedInUser>;
  userSubscription = this.loggedInUser$.subscribe(user => {
    this.permissions = user.permissions;
    this.userId = user.userId;
    if (user.teams)
      this.getTeamsService.getTeams(user.teams);
  })

  constructor(private getTeamsService: GetTeamsService) {
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
