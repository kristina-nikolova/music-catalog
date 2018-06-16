import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, PlayerService } from '@shared/services';
import { User } from '@shared/models';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _playerService: PlayerService
  ) {}

  ngOnInit() {
    const _defaultPath = '/catalog/recommended';

    if (window.location.pathname === '/catalog') {
      this._router.navigateByUrl(_defaultPath);
    } else {
      this._router.navigateByUrl(window.location.pathname);
    }
    this.user = this._route.snapshot.data['layoutResolver'];
    this._userService.myId = this.user.id;
    this._playerService.startPlayer();
  }
}
