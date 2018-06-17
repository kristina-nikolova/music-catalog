import { OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService, PlayerService } from '@shared/services';
import { User } from '@shared/models';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: User;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _playerService: PlayerService
  ) {}

  ngOnInit() {
    this.user = this._route.snapshot.data['user'];
    this._userService.myId = this.user.id;
    this._playerService.startPlayer();
  }

  ngOnDestroy() {
    // TODO: remove event listener for spotify player
  }
}
