import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OpaqueToken } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthClientService } from './shared/services/auth.service';
import { HttpClientService } from './shared/services/http-client.service';
import { UserService } from './shared/services/user.service';

export let MAIN_CONFIG = new OpaqueToken('app.config');

import { APP_CONFIG } from './shared/app.config';
import { AppComponent }  from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { FeaturedPlaylistsListComponent } from './featured-playlists/featured-playlists-list.component';
import { PlaylistComponent } from './shared/components/playlist/playlist.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { UserboxComponent } from './shared/components/userbox/userbox.component';
import { FollowButtonComponent } from './shared/components/follow-button/follow-button.component';
import { PlaylistsListComponent } from './shared/components/playlists-list/playlists-list.component';

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
    FeaturedPlaylistsListComponent,
    PlaylistComponent,
    MyPlaylistsComponent,
    PlaylistDetailsComponent,
    UserboxComponent,
    FollowButtonComponent,
    PlaylistsListComponent
  ],
  providers: [
    { provide: MAIN_CONFIG, useValue: APP_CONFIG },
    OAuthService,
    HttpClientService,
    AuthClientService,
    UserService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
