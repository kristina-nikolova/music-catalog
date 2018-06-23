import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AuthClientService,
  HttpInterceptorService,
  PlayerService,
  TracksWithMoodService,
  UserService
} from '@shared/services';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { UserboxComponent } from './layout/userbox/userbox.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { UserResolver } from './shared/resolvers/user-resolver.service';
import { SharedModule } from './shared/shared.module';

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
    UserResolver,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
