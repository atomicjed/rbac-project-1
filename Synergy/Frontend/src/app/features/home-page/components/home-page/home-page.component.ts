import {Component} from '@angular/core';
import {Select} from "@ngxs/store";
import {UserStateModel} from "@app/store/states/user.state";
import {map, Observable, tap} from "rxjs";
import {GetTeamsService} from "@app/services/api-requests/teams/get-teams.service";

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
export class HomePageComponent {

  @Select((state: { user: UserStateModel }) => state.user.loggedInUser)
  loggedInUser$!: Observable<LoggedInUser>;

  userId$ = this.loggedInUser$.pipe(
    tap(user => {
      if (user.teams)
        this.getTeamsService.getTeamsAndUpdateStore(user.teams);
    }),
    map(user => user.userId)
  );

  constructor(private getTeamsService: GetTeamsService) {
  }
}
