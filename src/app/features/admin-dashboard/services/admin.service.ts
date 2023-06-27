import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AllTransactions,
  TransactionsFilter,
} from '../../dashboard/store/constantes';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsersTransactions(
    transactionFilter: TransactionsFilter
  ): Observable<AllTransactions> {
    const transactionDate = transactionFilter.transactionDate ?? false;
    const typeOfAccount = transactionFilter.typeOfAccount ?? false;
    const reciverNameOrAmount = transactionFilter.reciverNameOrAmount ?? false;
    const status = transactionFilter.status ?? false;
    const take = transactionFilter.take ?? false;
    const skip = transactionFilter.skip ?? false;
    return this.http.get<AllTransactions>('transaction/all', {
      params: {
        status,
        reciverNameOrAmount,
        typeOfAccount,
        transactionDate,
        skip,
        take,
      },
    });
  }

  rejectTransaction(id: number) {
    const data = { id: id, newStatus: 'Rejeté' };
    return this.http.post('transaction/change-status', data);
  }

  accepteTransaction(id: number) {
    const data = { id: id, newStatus: 'Accepté' };
    return this.http.post('transaction/change-status', data);
  }
}
