import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Playlist, PlaylistTile, User } from '@shared/models';
import { APP_CONFIG } from './../shared/app.config';
import { UserService } from './../shared/services/user.service';

@Injectable()
export class MyPlaylistsService {
  constructor(private _http: HttpClient, private userService: UserService) {}

  /**
   * name: getMyPlaylists
   * params:
   * description: get all my Playlists using spotify api
   */
  getMyPlaylists(): Observable<PlaylistTile[]> {
    return this._http
      .get(APP_CONFIG.apiSpotifyUrl + '/me/playlists')
      .map((res: any) => res.items)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  /**
   * name: getMyPlaylistById
   * params:{string} playlistId
   * params:{string} userId
   * description: get playlist details  using spotify api
   */
  getMyPlaylistById(playlistId: string, userId: string): Observable<Playlist> {
    return this._http
      .get(APP_CONFIG.apiSpotifyUrl + '/users/' + userId + '/playlists/' + playlistId)
      .map((res) => new Playlist(res))
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  /**
   * name: getMyPlaylistCreator
   * params:{string} userId
   * description: get the creator of the playlist using spotify api
   */
  getMyPlaylistCreator(userId: string): Observable<User> {
    return this._http
      .get(APP_CONFIG.apiSpotifyUrl + '/users/' + userId)
      .map((res) => new User(res))
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }
}
