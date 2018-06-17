import { Injectable, Injector } from '@angular/core';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { APP_CONFIG } from '../../shared/app.config';
import { Router } from '@angular/router';

@Injectable()
export class AuthClientService {
  constructor(private _oauthService: OAuthService, private _injector: Injector) {}

  /**
   * name: userAuthentication
   * params:
   * description: Authentication using spotify api
   */
  userAuthenticationSetup(): void {
    this._oauthService.loginUrl = APP_CONFIG.apiOAuthUrl;
    this._oauthService.redirectUri = APP_CONFIG.mainUrl + '/catalog';
    this._oauthService.clientId = APP_CONFIG.clientId;
    this._oauthService.scope = APP_CONFIG.apiPermissions;
    this._oauthService.setStorage(sessionStorage);

    this._oauthService.tryLogin({
      onTokenReceived: function(context) {}
    });
  }

  isAuthenticated() {
    if (sessionStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }
}
