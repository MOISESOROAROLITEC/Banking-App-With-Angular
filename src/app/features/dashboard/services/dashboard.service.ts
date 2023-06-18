import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccounts } from 'src/app/shared/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUserAccounts() {
    return this.http.get<UserAccounts>("user/acounts")
  }

  disconnectUser() {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    this.router.navigate(["auth/login"])
  }

}
