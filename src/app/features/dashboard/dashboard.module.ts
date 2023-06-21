import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../auth/store/user.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { userAccountsReducer } from './store/reducer/accouts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/effect/accounts.effect';
import { RoutesGuard } from 'src/app/shared/guards/routes.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { userTransactionsReducer } from './store/reducer/transactions.reducer';
import { TransactionEffects } from './store/effect/transactions.effect';
import { AccountComponent } from './components/account/account.component';
import { TransfertComponent } from './components/transfert/transfert.component';
import { AccountAndSubAccountEffects } from './store/effect/allAccounts.effect';
import { allAccountsReducer, allSubAccountsReducer } from './store/reducer/allAccounts.reducer';

const routes: Routes = [
  {
    path: "", component: MainComponent, canActivate: [RoutesGuard], children: [
      { path: "", redirectTo: 'transactions', pathMatch: "full" },
      { path: "transactions", component: TransactionsComponent },
      { path: "transfert", component: TransfertComponent },
    ]
  }
]

@NgModule({
  declarations: [
    MainComponent,
    TransactionsComponent,
    AccountComponent,
    TransfertComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    NgFor,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('userFeature', userReducer),
    StoreModule.forFeature('userAccounts', userAccountsReducer),
    StoreModule.forFeature('userTransactions', userTransactionsReducer),
    StoreModule.forFeature('allAccounts', allAccountsReducer),
    StoreModule.forFeature('allSubAccounts', allSubAccountsReducer),
    EffectsModule.forFeature(DashboardEffects),
    EffectsModule.forFeature(TransactionEffects),
    EffectsModule.forFeature(AccountAndSubAccountEffects),
  ]
})
export class DashboardModule { }
