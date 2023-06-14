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

    return this.http.post(`${baseUrl}/user/create`, userDatas, httpOptions)
      .pipe(
        catchError((err: Error) => {
          return of(err)
        })
      )


  }

  login(userDatas: UserDatasLogin) {
    console.log("la data : ", userDatas);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    try {
      return this.http.post(`${baseUrl}/auth/login`, userDatas, httpOptions)
        .pipe(
          catchError((err: Error) => {
            return of(err)
          })
        )
    } catch (error) {
      console.log("l'erreur rencontré est : ", error);
      return
    }
  }



}
