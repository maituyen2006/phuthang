import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifiedComponent } from './verified/verified.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VerifiedModule } from './verified/verified.module';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { VerifiedGuard } from './verified/guard/verified.guard';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { CurrencyStringPipe } from './pipe/currency-string.pipe';
import {EntitlementInsertComponent} from 'src/app/verified/dialog/entitlement-insert/entitlement-insert.component';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    VerifiedComponent,
    AuthComponent,
    CurrencyStringPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AuthModule,
    HttpClientModule,
    VerifiedModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
  providers: [AuthGuard, VerifiedGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
