import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './features/auth/sign-up.component';
// import { LoginComponent } from './features/sign-in/login.component';

const routes: Routes = [
  { path: "", redirectTo: "sign-up", pathMatch: "full" },
  { path: "sign-up", component: SignUpComponent, pathMatch: "full" },
  // { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
