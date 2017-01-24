import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Component } from '@angular/core';

@Component({
  providers: [],
  template: `
    <div class="center">
      <button class="button" (click)="login()">Login</button>
    </div>   
  `,
})

export class LoginComponent {
  constructor(private oAuthService: OAuthService) {}
    
  public login() {
      this.oAuthService.initImplicitFlow();
  }
}
