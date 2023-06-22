import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "auth/sign-up", pathMatch: "full" },
  { path: "auth", loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: "dashboard", loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: "admin", loadChildren: () => import('./features/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
