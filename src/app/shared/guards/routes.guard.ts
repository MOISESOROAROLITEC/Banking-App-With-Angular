import { CanActivateFn, Router } from '@angular/router';
import { UserConnectStatusService } from '../services/user.connected.status.service';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class ActivateRoute {
  constructor(
    private userConnectStatus: UserConnectStatusService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (this.userConnectStatus.isUserConnected()) {
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
