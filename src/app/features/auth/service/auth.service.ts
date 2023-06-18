import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDatas, UserDatasLogin, UserDatasSignUp } from 'src/app/shared/constantes/constantes';
import { changeUserEmail, changeUserName, changeUserToken } from '../store/user.actions';
import { take } from 'rxjs';

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
    return this.http.post<UserDatas>(`user/create`, userDatas, httpOptions).pipe(
      take(1)
    )
  }

  login(userDatas: UserDatasLogin) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(`auth/login`, userDatas, httpOptions)
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


