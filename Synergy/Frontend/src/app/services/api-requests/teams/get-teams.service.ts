import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {map} from "rxjs";
import {TeamsActions} from "@app/store/actions/teams.action";
import {Store} from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class GetTeamsService {

  constructor(private http: HttpClient, private store: Store) {
  }

  getTeams(teamIds: string[]) {
    const url = `${API_ROOT}Teams/get-user-teams`;
    if (teamIds.length === 0)
      return;
    return this.http.post(url, teamIds);
  }

  getTeamsAndUpdateStore(teamIds: string[]) {

    const teams = this.getTeams(teamIds)
    if (teams) {
      teams.pipe(
        map((teams: any) => {
          this.store.dispatch(new TeamsActions.SetTeams(teams));
        })
      ).subscribe();
    }
  }
}
