import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../auth/store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TransactionsComponent } from './components/transactions/transactions.component';
import { MainComponent } from './components/main/main.component';
import { userAccountsReducer } from './store/reducer/accouts.reducer';
import { DashboardEffects } from './store/effect/accounts.effect';
import { userTransactionsReducer } from './store/reducer/transactions.reducer';
import { TransactionEffects } from './store/effect/transactions.effect';
import { AccountComponent } from './components/account/account.component';
import { TransfertComponent } from './components/transfert/transfert.component';
import { AccountAndSubAccountEffects } from './store/effect/allAccounts.effect';
import {
  allAccountsReducer,
  allSubAccountsReducer,
} from './store/reducer/allAccounts.reducer';
import { TransfertEffects } from './store/effect/transfert.effect';
import { userTransfertReducer } from './store/reducer/transfert.reducer';
import { TransfertSuccesComponent } from './components/transfert-succes/transfert-succes.component';
import { TransfertFaileComponent } from './components/transfert-faile/transfert-faile.component';
import { TransactionStatusColorPipe } from './pipe/transaction-status-color.pipe';
import { UserEffects } from '../auth/store/user.effect';
import { RoutesGuard } from 'src/app/shared/guards/is-user-connected-guard/routes.guard';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';
import { EditUserInfosComponent } from './components/edit-user-infos/edit-user-infos.component';
import { FormsModule } from '@angular/forms';
import { RechargeAnAccountComponent } from './components/recharge-an-account/recharge-an-account.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [RoutesGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transfert', component: TransfertComponent },
      { path: 'recharge', component: RechargeAnAccountComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    TransactionStatusColorPipe,
    TransactionsComponent,
    AccountComponent,
    TransfertComponent,
    RechargeAnAccountComponent,
    TransfertSuccesComponent,
    TransfertFaileComponent,
    EditUserInfosComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    NgFor,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('userFeature', userReducer),
    StoreModule.forFeature('userAccounts', userAccountsReducer),
    StoreModule.forFeature('userTransactions', userTransactionsReducer),
    StoreModule.forFeature('allAccounts', allAccountsReducer),
    StoreModule.forFeature('allSubAccounts', allSubAccountsReducer),
    StoreModule.forFeature('userTransfert', userTransfertReducer),
    EffectsModule.forFeature(DashboardEffects),
    EffectsModule.forFeature(TransactionEffects),
    EffectsModule.forFeature(AccountAndSubAccountEffects),
    EffectsModule.forFeature(TransfertEffects),
    EffectsModule.forFeature(UserEffects),
  ],
})
export class DashboardModule {}
