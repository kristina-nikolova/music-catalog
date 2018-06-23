import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { User } from '@shared/models';
import { UserService } from '@shared/services';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this._userService.getProfile();
  }
}
