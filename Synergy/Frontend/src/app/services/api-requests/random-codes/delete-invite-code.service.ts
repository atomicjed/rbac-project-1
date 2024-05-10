import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteInviteCodeService {

  constructor(private http: HttpClient) { }

  deleteInviteCode(inviteCode: string) {
    const url = `${API_ROOT}RandomCode/delete-invite-code`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {inviteCode: inviteCode};
    return this.http.delete(url, { headers: headers, body: body});
  }
}
