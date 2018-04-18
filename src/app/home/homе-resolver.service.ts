import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { User } from './../shared/model/user.model';

import { UserService } from '../shared/services/user.service';

@Injectable()
export class HomeResolver implements Resolve<User> {
  
  constructor(private _userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this._userService.getProfile();
  }
}
