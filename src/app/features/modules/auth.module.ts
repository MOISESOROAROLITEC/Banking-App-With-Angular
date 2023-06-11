import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignUpComponent } from '../components/auth/sign-up/sign-up.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
