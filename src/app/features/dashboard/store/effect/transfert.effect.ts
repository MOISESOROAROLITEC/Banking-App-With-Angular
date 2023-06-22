import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { doTransfertAction, doTransfertFaile, doTransfertSuccess } from '../actions/transfert.actions';
import { Store } from '@ngrx/store';
import { getUserAccountsAction } from '../actions/accounts.actions';
import { MatDialog } from '@angular/material/dialog';
import { TransfertSuccesComponent } from '../../components/transfert-succes/transfert-succes.component';
import { TransfertFaileComponent } from '../../components/transfert-faile/transfert-faile.component';

@Injectable()
export class TransfertEffects {

  DoTransfertEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(doTransfertAction.type),
      exhaustMap(({ transfertData }) => this.dashboardService.doTransfert(transfertData)
        .pipe(
          map((response) => {
            this.dialog.open(TransfertSuccesComponent, {
              width: '50%',
              height: '60%',
            })
            this.store.dispatch(getUserAccountsAction());
            return ({ type: doTransfertSuccess.type })
          }),
          catchError((error) => {
            const dialogRef = this.dialog.open(TransfertFaileComponent, {
              width: "50%",
              height: "60%",
              data: {
                errorMessage: error.error.message
              }
            })
            dialogRef.afterClosed().subscribe()
            return of({ type: doTransfertFaile.type })
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private toast: ToastService,
    private store: Store,
    private dialog: MatDialog
  ) { }

}
