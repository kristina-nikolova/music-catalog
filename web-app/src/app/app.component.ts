import { Component, OnInit } from '@angular/core';

import { AuthClientService } from './shared/services/auth.service';

@Component({
  selector: 'music-catalog',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(private authClientService: AuthClientService ) {}

  ngOnInit() {
    this.authClientService.userAuthenticationSetup();
  }
}
