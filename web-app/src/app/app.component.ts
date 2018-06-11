import { Component, OnInit } from '@angular/core';

import { AuthClientService } from '@shared/services';

@Component({
  selector: 'music-catalog',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _authClientService: AuthClientService) {}

  ngOnInit() {
    this._authClientService.userAuthenticationSetup();
  }
}
