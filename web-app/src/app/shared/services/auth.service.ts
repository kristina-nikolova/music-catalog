import { Injectable, Injector, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { APP_CONFIG } from '../../shared/app.config';

@Injectable()
export class AuthClientService {
  constructor(private _oauthService: OAuthService, private _router: Router, private _ngZone: NgZone) {}

  /**
   * name: userAuthentication
   * params:
   * description: Setup authentication using oauth and spotify api
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

  /**
   * name: isAuthenticated
   * params:
   * description: Check if user is authenticated
   */
  isAuthenticated() {
    if (sessionStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * name: login
   * params:
   * description: login using oauth
   */
  login() {
    this._oauthService.initImplicitFlow();
  }

  /**
   * name: logout
   * params:
   * description: logout and navigate to the login page
   */
  logout() {
    // Need explicitly to run router.navigate in the ngZone
    // when want to navigate from lazily loaded child component to parent
    this._ngZone.run(() => {
      this._router.navigate(['/login']);
    });
    this._oauthService.logOut();
  }
}
