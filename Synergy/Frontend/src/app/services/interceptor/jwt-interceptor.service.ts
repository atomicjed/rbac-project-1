import { Injectable } from '@angular/core';
import {FirebaseAuthService} from "../auth/firebase-auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, mergeMap, Observable, switchMap} from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private afAuthService: FirebaseAuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return from(this.afAuthService.getToken()).pipe(
      mergeMap(token => {
        if(token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          })
        }
        return next.handle(req);
      })
    )
  }
}
