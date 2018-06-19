import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService, PlayerService, AuthClientService } from '@shared/services';
import { User } from '@shared/models';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _playerService: PlayerService,
    private _authService: AuthClientService
  ) {}

  ngOnInit() {
    this.user = this._route.snapshot.data['user'];
    this._userService.myId = this.user.id;
    this._playerService.startPlayer();
  }

  logout() {
    this._authService.logout();
  }
}
