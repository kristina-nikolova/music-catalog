import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

import { User } from './../shared/model/user.model';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router,
              private userService: UserService ) {
    router.navigateByUrl('/catalog/featured-playlists');
 }
  ngOnInit() {
    this.userService.getProfile()
          .subscribe(
            (data) => {
              this.user = data;
              this.userService.myId = data.id;
              console.log('user: ');
              console.log(data);
              }, //Bind to view
              (err) => {
                  console.log(err);
              }
        );
  }
}
