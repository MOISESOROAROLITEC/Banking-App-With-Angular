import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { updateUserInformationsAction } from 'src/app/features/auth/store/user.actions';
import { getUserEmail, getUserName } from 'src/app/features/auth/store/user.selector';
import { UpdateUserDatas } from 'src/app/shared/constantes/constantes';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-edit-user-infos',
  templateUrl: './edit-user-infos.component.html',
  styleUrls: ['./edit-user-infos.component.scss']
})
export class EditUserInfosComponent {
  @Input() drawer: any;
  editFormUsername: FormGroup
  editFormEmail: FormGroup
  editFormPassword: FormGroup
  username: string = ""
  email: string = ""
  data: UpdateUserDatas = {
    name: undefined,
    email: undefined,
    password: undefined
  }
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastService: ToastService,
  ) {
    store.select(getUserName).pipe(
      tap((val) => this.username = val),
      take(1)
    ).subscribe()
    store.select(getUserEmail).pipe(
      tap(value => this.email = value),
      take(1)
    ).subscribe()

    this.editFormUsername = this.fb.group({
      username: [this.username, [Validators.maxLength(50), Validators.minLength(4)]],
    });

    this.editFormEmail = this.fb.group({
      email: [this.email, [Validators.email]],
    });

    this.editFormPassword = this.fb.group({
      password: ['', [Validators.pattern("^.{8,50}$")]],
      newPassword: ['', [Validators.pattern("^.{8,50}$")]],
      confirmPassword: ['', [Validators.pattern("^.{8,50}$")]],
    })
  }

  ngOnInit() {
  }

  changeUsernameIconColor(btnName: string) {
    let btnClass: string
    if (this.editFormUsername.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.editFormUsername.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }
  changeEmailIconColor(btnName: string) {
    let btnClass: string
    if (this.editFormEmail.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.editFormEmail.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }
  changePasswordIconColor(btnName: string) {
    let btnClass: string
    if (this.editFormPassword.get(btnName)?.valid) {
      btnClass = "valid-input"
    } else {
      btnClass = "invalid-input"
    }
    if (this.editFormPassword.get(btnName)?.pristine) {
      btnClass = "default-input"
    }
    return btnClass;
  }

  onSubmitUsername() {
    if (this.editFormUsername.valid) {
      this.data = { ...this.data, name: this.editFormUsername.get("username")?.value }
      this.store.dispatch(updateUserInformationsAction({ data: this.data }))
      this.data = { ...this.data, name: undefined }
    }
  }

  onSubmitEmail() {
    console.log("submit email");
    if (this.editFormEmail.valid) {
      this.data = { ...this.data, email: this.editFormEmail.get("email")?.value }
      this.store.dispatch(updateUserInformationsAction({ data: this.data }))
      this.data = { ...this.data, email: undefined }
    }
  }

  onSubmitPassword() {
    if (this.editFormPassword.valid) {
      this.data = { ...this.data, password: this.editFormPassword.get("password")?.value }
      this.store.dispatch(updateUserInformationsAction({ data: this.data }))
      this.data = { ...this.data, password: undefined }
    }
  }
}
