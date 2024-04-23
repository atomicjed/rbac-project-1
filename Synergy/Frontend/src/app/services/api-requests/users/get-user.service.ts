import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) { }

  getUser(userId: string) {
    const url = `${API_ROOT}Users/get-user`;
    return this.http.post(url, userId);
  }
}
