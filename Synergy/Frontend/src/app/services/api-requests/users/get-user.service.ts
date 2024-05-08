import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROOT} from "../../../../constants/constants";
import {BehaviorSubject, catchError, map, switchMap, tap} from "rxjs";
import {Store} from "@ngxs/store";
import {UserActions} from "../../../store/actions/user.action";
import {GetTeamsService} from "../teams/get-teams.service";
import {Team, TeamsActions} from "../../../store/actions/teams.action";

interface User {
  userId: string,
  role: string,
  permissions: string[],
  teams: string[]
}
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  private userPermissionBehaviorSubject = new BehaviorSubject<string[]>([]);
  permissions$ = this.userPermissionBehaviorSubject.asObservable();
  private userRoleBehaviorSubject = new BehaviorSubject<string>('');
  role$ = this.userRoleBehaviorSubject.asObservable();

  constructor(private http: HttpClient, private store: Store, private getTeamsService: GetTeamsService) { }

  getUserInfo(userId: string) {
    const url = `${API_ROOT}Users/get-user-info`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(url, {userId}, { headers, withCredentials: true }).pipe(
      tap(user => {
        const storeUser : User = {
          userId: user.userId,
          role: user.role,
          permissions: user.permissions,
          teams: user.teams
        }
        this.store.dispatch(new UserActions.SetUser(storeUser));
        this.getTeamsService.getTeams(user.teams);
        const permissionsArray = Object.values(user.permissions);
        this.userPermissionBehaviorSubject.next(permissionsArray);
        this.userRoleBehaviorSubject.next(user.role);
      }),
      catchError(error => {
        console.log("Error whilst getting permissions:", error);
        throw error;
        }
      )
    )
  }
}
