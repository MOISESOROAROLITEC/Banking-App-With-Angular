import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserHttpInterceptor } from './shared/interceptors/httpInterceptor';
import { ActivateRoute } from './shared/guards/is-user-connected-guard/routes.guard';
import { TransactionStatusColorPipe } from './shared/pipe/transaction-status-color/transaction-status-color.pipe';

import { getUserInformationsAction } from './features/auth/store/user.actions';
import { UserEffects } from './features/auth/store/user.effect';
import { userReducer } from './features/auth/store/user.reducer';
import { ActivateAdminRoute } from './shared/guards/admin/admin.guard';
import { InactivateAuthRoutes } from './shared/guards/is-user-not-connected-guard/routes.guard';

@NgModule({
  declarations: [AppComponent, TransactionStatusColorPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      newestOnTop: true,
      preventDuplicates: true,
      progressBar: true,
      resetTimeoutOnDuplicate: true,
    }),
    StoreModule.forFeature('userFeature', userReducer),
    StoreModule.forRoot({}, {}),
    EffectsModule.forFeature(UserEffects),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserHttpInterceptor,
      multi: true,
    },
    ActivateRoute,
    ActivateAdminRoute,
    InactivateAuthRoutes,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store: Store) {
    this.store.dispatch(getUserInformationsAction());
  }
}
