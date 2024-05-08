import {CanActivateFn, Router} from "@angular/router";
import { inject } from "@angular/core";
import {map} from "rxjs";
import {GetUserService} from "../services/api-requests/users/get-user.service";

export function hasPermissionGuard(requiredPermission: string): CanActivateFn {
  return (route, state) => {
    const permissionsService = inject(GetUserService);
    const router = inject(Router);

    return permissionsService.permissions$.pipe(
      map(permissions => {
        if (permissions.includes(requiredPermission)) {
          return true;
        } else {
          router.navigate(['']).then();
          return false;
        }
      })
    );
  };
}
