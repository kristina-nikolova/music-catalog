import { Component, OnInit } from '@angular/core';

import { AuthClientService } from './shared/services/auth.service';

@Component({
  selector: 'music-catalog',
  template: `
    <div class="catalog flex flex-column">
      <header>
        <h1>{{title}}</h1>
      </header>
      <content>
        <router-outlet></router-outlet>
      </content>  
      <footer>
        Some footer here
      </footer>
    </div>  
  `
})
export class AppComponent implements OnInit  { 
  title = 'Music is everywhere';

  constructor(private authClientService: AuthClientService ) {}

  ngOnInit() {
    this.authClientService.userAuthenticationSetup();
  }
}
