import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubAccount, UserAccounts } from 'src/app/shared/constantes/constantes';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private httpService: HttpService,
  ) { }

  getUserAccounts(): Observable<UserAccounts> {
    return this.http.get<UserAccounts>("user/acounts")
  }

  createSaveAccounts(parentIban: string): Observable<SubAccount> {
    return this.createSubAccounts(parentIban, "Epargne")
  }
  createBlockedAccounts(parentIban: string): Observable<SubAccount> {
    return this.createSubAccounts(parentIban, "Bloqué")
  }

  createSubAccounts(parentIban: string, accountType: "Bloqué" | "Epargne"): Observable<SubAccount> {
    const datas = {
      currency: "OXF",
      type: accountType,
      bic: "UBA",
      parentAccountIban: parentIban
    }
    return this.http.post<SubAccount>("sub-account/create", datas, this.httpService.getHeader())
  }

  disconnectUser() {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    this.router.navigate(["auth/login"])
  }

}
