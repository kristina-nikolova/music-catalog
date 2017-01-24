import { Component, OnInit } from '@angular/core';

import { AuthClientService } from './shared/services/auth.service';

@Component({
  selector: 'music-catalog',
  template: `
    <div class="catalog flex flex-column">
      <header class="header"></header>
      <router-outlet></router-outlet> 
      <footer class="footer center">
        © 2017 Krisify
      </footer>
    </div>  
  `
})
export class AppComponent implements OnInit  {

  constructor(private authClientService: AuthClientService ) {}

  ngOnInit() {
    this.authClientService.userAuthenticationSetup();
  }
}
