import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: "", component: AuthComponent, children: [
      { path: "", redirectTo: 'login', pathMatch: "full" },
      { path: "sign-up", component: SignUpComponent },
      { path: "login", component: LoginComponent },
    ]
  },

]

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService]
})
export class AuthModule { }
