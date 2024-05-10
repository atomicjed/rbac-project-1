import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {TeamsStateModel} from "../../store/states/teams.state";
import {Team} from "../../store/actions/teams.action";

@Injectable({
  providedIn: 'root'
})
export class GetTeamFromUrlService {
  @Select((state: {teams: TeamsStateModel}) => state.teams.userTeams)
  teams$!: Observable<Team[]>;
  constructor(private route: ActivatedRoute) { }

  getTeamByUrlSlug(urlSlug: string): Observable<Team | null> {
    return new Observable(teamSubscriber => {
      this.teams$.subscribe(teams => {
        const team = teams.find(x => x.urlSlug === urlSlug);
        teamSubscriber.next(team);
        teamSubscriber.complete();
      })
    })
  }
}
