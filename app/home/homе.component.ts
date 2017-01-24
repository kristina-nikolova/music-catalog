import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

import { User } from './../shared/model/user.model';

@Component({
  template: `
    <div>
      <userbox [userName]="user.display_name"
               [userPhoto]="user.images[0].url"
               *ngIf="isUserDataAvailable"></userbox>
      <nav>
        <a [routerLink]="['/catalog/featured-playlists']" 
           routerLinkActive="active">
           Featured Playlists
        </a>
        <a [routerLink]="['/catalog/my-playlists']" 
           routerLinkActive="active">
           My Playlists
        </a>
      </nav>
    </div>  
    <router-outlet></router-outlet>
  `,
})
export class HomeComponent implements OnInit {
  user: User;
  isUserDataAvailable:boolean = false;

  constructor(private router: Router,
              private userService: UserService ) {
    router.navigateByUrl('/catalog/featured-playlists');
 }

  ngOnInit() {
    this.userService.getProfile()
          .subscribe(
            (data) => {
              this.user = data;
              this.userService.setUserId(data.id);
              console.log('user: ');
              console.log(data);
              this.isUserDataAvailable = true;
              }, //Bind to view
              (err) => {
                  console.log(err);
              }
        );
  }
}
