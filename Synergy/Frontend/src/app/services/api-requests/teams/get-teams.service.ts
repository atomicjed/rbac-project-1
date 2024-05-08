import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {catchError, map, Observable, switchMap, tap} from "rxjs";
import {Team, TeamsActions} from "../../../store/actions/teams.action";
import {Store} from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class GetTeamsService {

  constructor(private http: HttpClient, private store: Store) { }

  getTeams(teamIds: string[]) {
    const url = `${API_ROOT}Teams/get-user-teams`;
    return this.http.post(url, teamIds).pipe(
      map((teams: any) => {
        this.store.dispatch(new TeamsActions.SetTeams(teams));
      })
    ).subscribe();
  }
}