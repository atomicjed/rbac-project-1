import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";

interface AddUserToTeamBody {
  userId: string,
  role: string,
  teamId: string
}

@Injectable({
  providedIn: 'root'
})
export class AddUserToTeamService {

  constructor(private http: HttpClient) { }

  AddUser(body: AddUserToTeamBody) {
    const url = `${API_ROOT}Teams/add-user-to-team`;
    return this.http.post(url, body);
  }
}
