import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserRoleSelector } from '../../store/user.selector';
import { lastValueFrom, map, of } from 'rxjs';
import { getUserRole } from 'src/app/features/auth/store/user.selector';

@Injectable()
export class ActivateAdminRoute {
  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getUserRole).pipe(
      map((role) => {
        if (role === "admin") {
          if (!state.url.includes("admin")) {
            this.router.navigate(["admin"])
            return false
          }
          return true
        } else {
          if (!state.url.includes("admin")) {
            return true
          }
          this.router.navigate(["dashboard"])
          return false
        }
      })
    )
  }
}


export const AdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ActivateAdminRoute).canActivate(route, state);
};
