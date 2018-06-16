import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import {
  AuthClientService,
  HttpInterceptorService,
  UserService,
  TracksWithMoodService,
  PlayerService
} from '@shared/services';
import { LayoutResolver } from './layout/layout-resolver.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { UserboxComponent } from './layout/userbox/userbox.component';
import { HeaderComponent } from './layout/header/header.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, SharedModule],
  declarations: [AppComponent, LoginComponent, LayoutComponent, UserboxComponent, HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    OAuthService,
    AuthClientService,
    UserService,
    TracksWithMoodService,
    LayoutResolver,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
