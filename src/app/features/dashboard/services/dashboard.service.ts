import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account, SubAccount, UpdateUserDatas, UserAccounts, UserDatas } from 'src/app/shared/constantes/constantes';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { DoTransfert, Transaction, TransactionsFilter } from '../store/constantes';

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
      currency: "OFX",
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

  getUserTransactions(transactionFilter: TransactionsFilter): Observable<Transaction[]> {
    const transactionDate = transactionFilter.transactionDate || false
    const typeOfAccount = transactionFilter.typeOfAccount || false
    const reciverNameOrAmount = transactionFilter.reciverNameOrAmount || false
    const status = transactionFilter.status || false

    return this.http.get<Transaction[]>(`transaction/user-transactions`, {
      params: { status, reciverNameOrAmount, typeOfAccount, transactionDate }
    });
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>("account/accounts")
  }

  getAllSubAccounts(): Observable<Account[]> {
    return this.http.get<SubAccount[]>("sub-account/sub-accounts")
  }

  doTransfert(transactionData: DoTransfert) {
    return this.http.post("transaction/transfert", transactionData, this.httpService.getHeader())
  }

  editUserDatas(data: UpdateUserDatas): Observable<UserDatas> {
    return this.http.patch<UserDatas>("user/update", data)
  }

}
