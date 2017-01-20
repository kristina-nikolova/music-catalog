import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Component } from '@angular/core';

import { APP_CONFIG } from './app.config';

@Component({
  selector: 'music-catalog',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/featured-playlists" routerLinkActive="active">Featured Playlists</a>
      <a routerLink="/my-playlists" routerLinkActive="active">My Playlists</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  { 
  title = 'Music is everywhere'; 

  constructor(private oauthService: OAuthService) {
        
        /**
         * Authentication using spotify api
         **/
        this.oauthService.loginUrl = APP_CONFIG.apiOAuthUrl;
        this.oauthService.redirectUri = APP_CONFIG.mainUrl + '/featured-playlists';
        this.oauthService.clientId = APP_CONFIG.clientId;
        this.oauthService.scope = APP_CONFIG.apiPermissions;
        this.oauthService.setStorage(sessionStorage);

        this.oauthService.tryLogin({});
        
    }
}
