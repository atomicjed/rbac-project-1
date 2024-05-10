import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";

interface Team {
  teamName: string;
  urlSlug: string;
  standardOfFootball: number;
  ageGroup: number;
  primaryColour: string;
  secondaryColour: string;
  managers: string[];
  players?: string[];
  personalTrainers?: string[];
}
interface RegisterTeamBody {
  userId: string;
  team: Team;
}
@Injectable({
  providedIn: 'root'
})
export class RegisterTeamService {

  constructor(private http: HttpClient) { }

  registerTeam(body: RegisterTeamBody) {
    const url = `${API_ROOT}Teams/register-team`;
    return this.http.post(url, body);
  }
}
