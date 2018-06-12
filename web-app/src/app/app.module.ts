import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthClientService, HttpInterceptorService, UserService, TracksWithMoodService } from '@shared/services';
import { HomeResolver } from './home/homе-resolver.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { UserboxComponent } from './home/userbox/userbox.component';
import { HeaderComponent } from './home/header/header.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, SharedModule],
  declarations: [AppComponent, LoginComponent, HomeComponent, UserboxComponent, HeaderComponent],
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
    HomeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
