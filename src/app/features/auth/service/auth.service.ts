import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDatas, UserDatasLogin, UserDatasSignUp } from 'src/app/shared/constantes/constantes';
import { changeUserEmail, changeUserName, changeUserToken } from '../store/user.actions';
import { take } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store,
    private httpService: HttpService
  ) { }

  createUser(userDatas: UserDatasSignUp) {
    return this.http.post<UserDatas>(`user/create`, { ...userDatas, role: 'user' }, this.httpService.getHeader()).pipe(
      take(1)
    )
  }

  loginUser(loginDatas: UserDatasLogin) {
    return this.http.post<UserDatas>(`auth/login`, loginDatas, this.httpService.getHeader())
  }

  resetPasswordVerifyEmail(email: string) {
    const resetData = { email: email }
    return this.http.post<{ token: string }>(`user/reset-password/verify-email`, resetData, this.httpService.getHeader())
  }

  resetPasswordNewPassword(password: string) {
    const newPassword = { password: password }
    return this.http.post(`user/reset-password/new-password`, newPassword, this.httpService.getHeader())
  }

  saveUserDatas(token: string) {
    localStorage.setItem('token', token)
    this.store.dispatch(changeUserToken({ newToken: token }))
  }
}
