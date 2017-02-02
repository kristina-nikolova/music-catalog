import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

/* App Root */
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthClientService } from './shared/services/auth.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { UserService } from './shared/services/user.service';
import { HomeResolver } from './home/homе-resolver.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { HeaderComponent } from './home/components/header/header.component';
import { UserboxComponent } from './home/components/userbox/userbox.component';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { RecommendedModule } from './recommended/recommended.module';
import { MyPlaylistsModule } from './my-playlists/my-playlists.module';
import { MyTopModule } from './my-top/my-top.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
// import { RecommendedRoutingModule } from './recommended/recommended-routing.module';
// import { MyPlaylistsRoutingModule } from './my-playlists/my-playlists-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
        storageType: 'localStorage'
    }),

    AppRoutingModule,
    // MyPlaylistsRoutingModule,
    // RecommendedRoutingModule,

    RecommendedModule,
    MyPlaylistsModule,
    MyTopModule,
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
      provide: Http,
      useClass: HttpInterceptorService
    },
    HttpInterceptorService,
    OAuthService,
    AuthClientService,
    UserService,
    HomeResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
