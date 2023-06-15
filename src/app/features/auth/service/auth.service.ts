import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDatas, UserDatasLogin, UserDatasSignUp, baseUrl } from 'src/app/shared/constantes';
import { changeUserEmail, changeUserName, changeUserToken } from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  createUser(userDatas: UserDatasSignUp) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<UserDatas>(`${baseUrl}/user/create`, userDatas, httpOptions)
  }

  login(userDatas: UserDatasLogin) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(`${baseUrl}/auth/login`, userDatas, httpOptions)
  }

  saveUserDatas(name: string, email: string, token: string | undefined) {
    localStorage.setItem('username', name)
    this.store.dispatch(changeUserName({ newName: name }))
    localStorage.setItem('email', email)
    this.store.dispatch(changeUserEmail({ newEmail: email }))
    if (token) {
      localStorage.setItem('token', token)
      this.store.dispatch(changeUserToken({ newToken: token }))
    }
  }

}


