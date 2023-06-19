import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  constructor(
    private router: Router
  ) { }

  isUserConnected(): boolean {
    if (
      localStorage.getItem('token') && localStorage.getItem('username') && localStorage.getItem('email')
    ) {
      return true
    } else {
      return false
    }
  }

  disconnectUser() {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("reset-token")
    this.router.navigate(["auth/login"])
  }

}
