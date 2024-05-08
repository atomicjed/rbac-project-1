import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {Observable} from "rxjs";

interface NewUser {
  userId: string | undefined,
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: NewUser):Observable<{ userId: string }> {
    const url = `${API_ROOT}Users/add-user`;
    return this.http.post<{ userId: string }>(url, newUser);
  }
}
