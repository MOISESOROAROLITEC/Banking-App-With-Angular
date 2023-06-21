import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubAccount, Transaction, UserAccounts, UserTransactions } from 'src/app/shared/constantes/constantes';
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
    return this.http.get<UserAccounts>("acounts-of-user")
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

  blockAccount(accountIban: string): Observable<SubAccount> {
    const data = {
      iban: accountIban,
      newType: "Bloqué"
    }
    return this.http.patch<SubAccount>("account/change-type", data);
  }

  deblockAccount(accountIban: string): Observable<SubAccount> {
    const data = {
      iban: accountIban,
      newType: "Epargne"
    }
    return this.http.patch<SubAccount>("account/change-type", data);
  }

  getUserTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("transaction/user-transactions")
  }

}
