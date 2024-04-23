import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {catchError, throwError} from "rxjs";

interface User {
  userId: string | undefined,
  name: string,
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: User) {
    const url = `${API_ROOT}Users/add-user`;
    this.http.post(url, newUser).pipe(
      catchError((error) => {
        console.log('Error:', error);
        throw error;
      })
    ).subscribe();
  }
}
