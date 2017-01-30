import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpInterceptorService } from './http-interceptor.service';
import { APP_CONFIG } from '../../shared/app.config';
import { User } from './../model/user.model';

@Injectable()
export class UserService {
  myId = '';

  constructor(private http: HttpInterceptorService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getProfile() : Observable<User> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/me')
              .map((res:Response) => new User(res.json()))
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }
}
