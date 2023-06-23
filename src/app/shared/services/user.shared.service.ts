import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from './http/http.service';
import { Observable } from 'rxjs';
import { UserDatas } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  constructor(
    private router: Router,
    private store: Store,
    private http: HttpClient,
    private httpServices: HttpService,
  ) {
  }

  isUserConnected(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }

  getUserInformations(): Observable<UserDatas> {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders(
      { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, }
    );
    return this.http.get<UserDatas>("user/informations", { headers })
  }

  disconnectUser() {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("reset-token")
    this.router.navigate(["auth/login"])
  }

}
