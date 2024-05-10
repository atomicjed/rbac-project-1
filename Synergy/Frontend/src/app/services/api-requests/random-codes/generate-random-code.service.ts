import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class GenerateRandomCodeService {

  constructor(private http: HttpClient) { }

  generateRandomCode(id: string) {
    const url = `${API_ROOT}RandomCode/generate-code`;
    return this.http.post(url, {id}, { responseType: 'text' });
  }
}
