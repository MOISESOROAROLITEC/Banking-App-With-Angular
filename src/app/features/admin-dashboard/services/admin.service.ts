import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTransactions } from 'src/app/shared/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getUsersTransactions(): Observable<AllTransactions> {
    return this.http.get<AllTransactions>("transaction/all")
  }

  rejectTransaction(id: number) {
    console.log(id);

    const data = { id: id, newStatus: 'Rejeté' }
    return this.http.post('transaction/change-status', data)
  }

  accepteTransaction(id: number) {
    const data = { id: id, newStatus: 'Accepté' }
    return this.http.post('transaction/change-status', data)
  }

}
