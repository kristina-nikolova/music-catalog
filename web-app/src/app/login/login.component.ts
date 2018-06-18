import { Component } from '@angular/core';
import { AuthClientService } from '@shared/services';

@Component({
  providers: [],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private _authService: AuthClientService) {}

  public login() {
    this._authService.login();
  }
}
