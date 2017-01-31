import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';

import { User } from './../shared/model/user.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService ) {
  }

  ngOnInit() {
    this.router.navigateByUrl(window.location.pathname);
    this.user = this.route.snapshot.data['homeResolver'];
    this.userService.myId = this.user.id;
  }
}
