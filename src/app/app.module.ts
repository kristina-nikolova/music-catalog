import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OpaqueToken } from '@angular/core';
import { Http, HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthClientService } from './shared/services/auth.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { UserService } from './shared/services/user.service';
import { HomeResolver } from './home/homе-resolver.service';

export let MAIN_CONFIG = new OpaqueToken('app.config');

import { APP_CONFIG } from './shared/app.config';
import { AppComponent }  from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { FeaturedPlaylistsComponent } from './featured-playlists/featured-playlists.component';
import { PlaylistComponent } from './shared/components/playlist/playlist.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { UserboxComponent } from './shared/components/userbox/userbox.component';
import { FollowButtonComponent } from './shared/components/follow-button/follow-button.component';
import { PlaylistsListComponent } from './shared/components/playlists-list/playlists-list.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TrackComponent } from './shared/components/track/track.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    HomeComponent,
    FeaturedPlaylistsComponent,
    PlaylistComponent,
    MyPlaylistsComponent,
    PlaylistDetailsComponent,
    UserboxComponent,
    FollowButtonComponent,
    PlaylistsListComponent,
    SpinnerComponent,
    TrackComponent
  ],
  providers: [
    { 
      provide: MAIN_CONFIG, 
      useValue: APP_CONFIG },
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
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
