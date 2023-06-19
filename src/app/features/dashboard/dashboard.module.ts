import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../auth/store/user.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { userAccountsReducer } from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effect';
import { RoutesGuard } from 'src/app/shared/guards/routes.guard';

const routes: Routes = [
  {
    path: "", component: MainComponent, canActivate: [RoutesGuard], children: [
      { path: "", redirectTo: 'transactions', pathMatch: "full" },
      { path: "transactions", component: TransactionsComponent }
    ]
  }
]

@NgModule({
  declarations: [
    MainComponent,
    UserInfoComponent,
    UserInfoComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('userFeature', userReducer),
    StoreModule.forFeature('userAccounts', userAccountsReducer),
    EffectsModule.forFeature(DashboardEffects),
  ]
})
export class DashboardModule { }
