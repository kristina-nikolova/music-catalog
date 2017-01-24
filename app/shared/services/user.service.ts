import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClientService } from './http-client.service';
import { APP_CONFIG } from '../../shared/app.config';
import { User } from './../model/user.model';

@Injectable()
export class UserService {
  userId = '';

  constructor(private http: HttpClientService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getProfile() : Observable<User> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/me')
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   setUserId(id: string): void {
     this.userId = id;
   }

   getUserId(): String {
     return this.userId;
   }
}
