import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthClientService } from '@shared/services';

@Component({
  selector: 'music-catalog',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _authClientService: AuthClientService, private _router: Router) {}

  ngOnInit() {
    this._authClientService.userAuthenticationSetup();
    if (window.location.hash.startsWith('#access_token')) {
      this._router.navigate(['/catalog/recommended']);
    }
  }
}
