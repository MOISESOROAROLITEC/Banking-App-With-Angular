import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { UserSharedService } from '../../services/user.shared.service';

@Injectable()
export class InactivateAuthRoutes {
  constructor(
    private userSharedService: UserSharedService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.userSharedService.isUserConnected()) {
      return true
    } else {
      this.router.navigate(["dashboard"])
      return false
    }
  }
}

export const AuthRoutsGuard: CanActivateFn = (route, state) => {
  return inject(InactivateAuthRoutes).canActivate();
};
