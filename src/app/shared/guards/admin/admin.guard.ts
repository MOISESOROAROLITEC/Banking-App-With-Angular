import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ActivateAdminRoute {
  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("je suis dans admin guard", state.url);
    const role = localStorage.getItem('role')
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
  }
}
export const AdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ActivateAdminRoute).canActivate(route, state);
};
