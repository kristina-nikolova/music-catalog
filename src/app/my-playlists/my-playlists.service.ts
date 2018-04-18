import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './../shared/services/user.service';
import { APP_CONFIG } from './../shared/app.config';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import { Playlist } from './../shared/model/playlist.model';
import { User } from './../shared/model/user.model';

@Injectable()

export class MyPlaylistsService {

  constructor(private _http: HttpClient,
              private userService: UserService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getMyPlaylists(): Observable<PlaylistTile[]> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/me/playlists')
              .map((res: any) => res.items)
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
   }

   /**
   * name: getMyPlaylistById
   * params:{string} playlistId
   * params:{string} userId
   * description: get playlist details  
   */
    getMyPlaylistById(playlistId: string, userId: string): Observable<Playlist> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/users/' + userId + '/playlists/' + playlistId)
              .map((res) => new Playlist(res))
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    /**
   * name: getMyPlaylistById
   * params:{string} playlistId
   * params:{string} userId
   * description: get playlist details  
   */
    getMyPlaylistCreator(userId: string): Observable<User> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/users/' + userId)
              .map((res) => new User(res))
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }
}
