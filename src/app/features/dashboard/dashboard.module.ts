import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [

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
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
