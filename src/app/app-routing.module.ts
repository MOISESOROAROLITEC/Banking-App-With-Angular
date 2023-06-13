import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './features/sign-in/login.component';

const routes: Routes = [
  { path: "", redirectTo: "sign-up", pathMatch: "full" },
  { path: "sign-up", loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule), pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
