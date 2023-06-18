import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserConnectStatusService {

  constructor() { }

  isUserConnected(): boolean {
    if (
      localStorage.getItem('token') && localStorage.getItem('username') && localStorage.getItem('email')
    ) {
      return true
    } else {
      return false
    }
  }

}
