import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { UserSharedService } from '../services/user.shared.service';

@Injectable()
export class ActivateRoute {
  constructor(
    private userSharedService: UserSharedService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    console.log("je suis dans la route gouard");
    if (this.userSharedService.isUserConnected()) {
      return true
    } else {
      this.router.navigate(["auth/login"])
      return false
    }
  }

}

export const RoutesGuard: CanActivateFn = (route, state) => {
  return inject(ActivateRoute).canActivate();
};
