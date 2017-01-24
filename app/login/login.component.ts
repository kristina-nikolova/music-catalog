import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Component } from '@angular/core';

@Component({
  providers: [],
  template: `
    <button class="btn btn-default" (click)="login()">
        Login
    </button>
  `,
})

export class LoginComponent {
  constructor(private oAuthService: OAuthService) {}
    
  public login() {
      this.oAuthService.initImplicitFlow();
  }
}
