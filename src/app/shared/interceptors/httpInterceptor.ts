import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../constantes/constantes';


@Injectable()
export class UserHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({ url: `${baseUrl}/${request.url}` });

    let token = localStorage.getItem("token");

    if (token && !request.url.includes("auth") && !request.url.includes("reset-password")) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    if (request.url.includes("new-password")) {
      token = localStorage.getItem("reset-token");
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(request);
  }
}
