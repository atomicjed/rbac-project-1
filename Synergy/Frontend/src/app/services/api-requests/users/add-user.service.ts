import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {catchError, throwError} from "rxjs";

interface NewUser {
  userId: string | undefined,
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: NewUser) {
    const url = `${API_ROOT}Users/add-user`;
    return this.http.post(url, newUser);
  }
}
