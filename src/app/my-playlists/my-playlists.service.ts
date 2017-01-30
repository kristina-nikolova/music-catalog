import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './../shared/services/user.service';
import { HttpInterceptorService } from './../shared/services/http-interceptor.service';
import { APP_CONFIG } from './../shared/app.config';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import { Playlist } from './../shared/model/playlist.model';

@Injectable()

export class MyPlaylistsService {

  constructor(private http: HttpInterceptorService,
              private userService: UserService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getMyPlaylists() : Observable<PlaylistTile[]> {
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
              .map((res:Response) => new Playlist(res.json()))
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
