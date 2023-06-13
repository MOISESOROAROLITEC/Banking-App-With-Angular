import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, elementAt, map, of, tap } from 'rxjs';
import { UserDatas, baseUrl } from 'src/app/shared/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(userDatas: UserDatas) {
    console.log("la data : ", userDatas);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    try {
      return this.http.post(`${baseUrl}/user/create`, userDatas, httpOptions)
        .pipe(
          // tap(response => console.log("La reponse dans tap est : ", response)),
          // map(response => (response as HttpResponse<UserDatas>).status),
          catchError((err: Error) => {
            // const status = (err as HttpErrorResponse).status
            return of(err)
          })
        )
    } catch (error) {
      console.log("l'erreur rencontré est : ", error);
      return
    }

  }
}
