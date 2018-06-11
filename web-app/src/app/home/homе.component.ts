import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '@shared/services';
import { User } from '@shared/models';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService) {}

  ngOnInit() {
    if (window.location.pathname === '/catalog') {
      this._router.navigateByUrl('/catalog/recommended');
    } else {
      this._router.navigateByUrl(window.location.pathname);
    }
    this.user = this._route.snapshot.data['homeResolver'];
    this._userService.myId = this.user.id;
  }
}
