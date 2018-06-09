import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Component } from '@angular/core';

@Component({
  providers: [],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  constructor(private _oAuthService: OAuthService) {}
    
  public login() {
      this._oAuthService.initImplicitFlow();
  }
}
