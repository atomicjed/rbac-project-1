import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class GetUserPermissionsService {
  private userPermissionBehaviorSubject = new BehaviorSubject<string[]>([]);
  permissions$ = this.userPermissionBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserPermissions(userId: string) {
    const url = `${API_ROOT}Permissions/get-user-permissions`;
    return this.http.post(url, {userId}).pipe(
      tap(permissions => {
        const permissionsArray = Object.values(permissions);
        this.userPermissionBehaviorSubject.next(permissionsArray);
      }),
      catchError(error => {
        console.log("Error whilst getting permissions:", error);
        throw error;
        }
      )
    ).subscribe();
  }

  setPermissions(permissions: string[]) {
    this.userPermissionBehaviorSubject.next(permissions);
  }
}
