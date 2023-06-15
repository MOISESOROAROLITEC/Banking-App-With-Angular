import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, elementAt, map, of, tap } from 'rxjs';
import { UserDatas, UserDatasLogin, UserDatasSignUp, baseUrl } from 'src/app/shared/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(userDatas: UserDatasSignUp) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<UserDatas>(`${baseUrl}/user/create`, userDatas, httpOptions)
  }

  login(userDatas: UserDatasLogin) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(`${baseUrl}/auth/login`, userDatas, httpOptions)
  }



}
