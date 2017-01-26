import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './../shared/services/user.service';
import { HttpClientService } from './../shared/services/http-client.service';
import { APP_CONFIG } from './../shared/app.config';
import { Playlist } from './../shared/model/playlist.model';

@Injectable()

export class MyPlaylistsService {

  constructor(private http: HttpClientService,
              private userService: UserService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getMyPlaylists() : Observable<Playlist[]> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/me/playlists')
              .map((res:Response) => res.json().items)
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   /**
   * name: getMyPlaylistById
   * params:{string} playlistId
   * params:{string} userId
   * description: get playlist details
   */
    getMyPlaylistById(playlistId: string, userId: string): Observable<Playlist> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/users/' + userId + '/playlists/' + playlistId)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
