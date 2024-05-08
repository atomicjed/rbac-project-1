import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {Observable} from "rxjs";

interface ValidateCodeBody {
  randomCode: string,
  teamId: string,
}
@Injectable({
  providedIn: 'root'
})
export class ValidateInviteCodeService {

  constructor(private http: HttpClient) { }

  ValidateCode(body: ValidateCodeBody): Observable<boolean> {
    const url = `${API_ROOT}RandomCode/validate-invitation-code`;
    return this.http.post<boolean>(url, body);
  }
}
