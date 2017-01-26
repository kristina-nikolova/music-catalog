import { Injectable } from '@angular/core';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { APP_CONFIG } from '../../shared/app.config';

@Injectable()
export class AuthClientService {

  constructor(private oauthService: OAuthService) {};

  /**
   * name: userAuthentication
   * params:
   * description: Authentication using spotify api
   */
  userAuthenticationSetup() : void {
      this.oauthService.loginUrl = APP_CONFIG.apiOAuthUrl;
      this.oauthService.redirectUri = APP_CONFIG.mainUrl + '/catalog';
      this.oauthService.clientId = APP_CONFIG.clientId;
      this.oauthService.scope = APP_CONFIG.apiPermissions;
      this.oauthService.setStorage(sessionStorage);

      this.oauthService.tryLogin({});
    }
}
