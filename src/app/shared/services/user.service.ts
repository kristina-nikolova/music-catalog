import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from '../../shared/app.config';
import { User } from './../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  myId = '';

  constructor(private _http: HttpClient) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getProfile(): Observable<User> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/me')
              .map((res) => new User(res))
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
   }
}
