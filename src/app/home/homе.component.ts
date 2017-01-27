import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

import { User } from './../shared/model/user.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: User;
  isDataLoading: boolean;

  constructor(private router: Router,
              private userService: UserService ) {
    router.navigateByUrl('/catalog/featured-playlists');
 }
  ngOnInit() {
    this.isDataLoading = true;
    this.userService.getProfile()
          .subscribe(
            (data) => {
              this.user = data;
              this.userService.myId = data.id;
              this.isDataLoading = false;
              },
              (err) => { console.log(err); }
        );
  }
}
