import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserHttpInterceptor } from './shared/interceptors/httpInterceptor';
import { ActivateRoute } from './shared/guards/routes.guard';
import { TransactionStatusColorPipe } from './shared/pipe/transaction-status-color/transaction-status-color.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TransactionStatusColorPipe,
  ],
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
      resetTimeoutOnDuplicate: true
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserHttpInterceptor,
      multi: true
    }, ActivateRoute
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
