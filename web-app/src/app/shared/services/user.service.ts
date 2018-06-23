import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '@shared/models';
import { APP_CONFIG } from '../../shared/app.config';

@Injectable()
export class UserService {
  myId = '';

  constructor(private _http: HttpClient) {}

  /**
   * name: getProfile
   * params:
   * description: get spotify user information using spotify api
   */
  getProfile(): Observable<User> {
    return this._http
      .get(APP_CONFIG.apiSpotifyUrl + '/me')
      .map((res) => new User(res))
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }
}
