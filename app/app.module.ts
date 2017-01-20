import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OpaqueToken } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';

export let MAIN_CONFIG = new OpaqueToken('app.config');

import { APP_CONFIG } from './app.config';
import { AppComponent }  from './app.component';
import { LoginComponent } from './login/login.component';
import { FeaturedPlaylistsListComponent } from './featured-playlists/featured-playlists-list.component';
import { PlaylistComponent } from './shared/components/playlist.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'featured-playlists', component: FeaturedPlaylistsListComponent },
  { path: 'my-playlists', component: MyPlaylistsComponent},
  //{ path: '**', component: AppComponent }
];

@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    FeaturedPlaylistsListComponent,
    PlaylistComponent,
    MyPlaylistsComponent 
  ],
  providers: [
    OAuthService,
    { provide: MAIN_CONFIG, useValue: APP_CONFIG }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
