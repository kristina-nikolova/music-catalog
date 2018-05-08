import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

/* App Root */
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthClientService } from './shared/services/auth.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { UserService } from './shared/services/user.service';
import { HomeResolver } from './home/homе-resolver.service';
import { MoodService } from './shared/services/mood.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { RecommendedModule } from './recommended/recommended.module';
import { MyPlaylistsModule } from './my-playlists/my-playlists.module';
import { MyTopModule } from './my-top/my-top.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { UserboxComponent } from './home/userbox/userbox.component';
import { HeaderComponent } from './home/header/header.component';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
        storageType: 'localStorage'
    }),
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserboxComponent,
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    OAuthService,
    AuthClientService,
    UserService,
    MoodService,
    HomeResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
