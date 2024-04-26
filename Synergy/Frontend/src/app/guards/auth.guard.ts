import {inject} from "@angular/core";
import {
  CanActivateFn,
  MaybeAsync,
  Router,
} from "@angular/router";
import {FirebaseAuthService} from "../services/auth/firebase-auth.service";
import {map} from "rxjs";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state): MaybeAsync<any> =>{
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if(isAuthenticated) {
        router.navigate(['']);
        return false;
      } else {
        return true;
      }
    })
  ).subscribe();
}
