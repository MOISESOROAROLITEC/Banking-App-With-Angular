import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastrService
  ) {
  }

  success(message: string, title = "Succès") {
    this.toast.success(message, title)
  }

  error(message: string, title = "Error") {
    this.toast.error(message, title)
  }

}
