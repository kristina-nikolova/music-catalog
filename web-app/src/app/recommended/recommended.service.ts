import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from './../shared/app.config';
import { PlaylistTile } from '@shared/models';
import { UserService } from '@shared/services';

@Injectable()

export class RecommendedService {

  constructor(private _http: HttpClient,
             private userService: UserService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getFeaturedPlaylists(): Observable<Array<PlaylistTile>> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/browse/featured-playlists')
              .map((res: any) => res.playlists.items)
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  /**
   * name: getNewReleasedAlbums
   * description: get recommended tracks
   */
//   getNewReleasedAlbums(): Observable<PlaylistTile[]> {
//       return this._http
//               .get(APP_CONFIG.apiMainUrl + '/browse/new-releases?limit=7')
//               .map((res) => res.albums.items)
//               .catch((error: any) => Observable.throw(error.error || 'Server error'));
//   }

   /**
   * name: followFeaturedPlaylists
   * params: {String} ownerId
   * params: {String} playlistId
   * description: user can follow a plalist
   */
  followFeaturedPlaylists(ownerId: string, playlistId: string) : Observable<PlaylistTile[]> {
      return this._http
              .put(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers', null, {})
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
   }

   /**
   * name: unfollowFeaturedPlaylists
   * params: {String} ownerId
   * params: {String} playlistId
   * description: user can follow a plalist
   */
  unfollowFeaturedPlaylists(ownerId: string, playlistId: string) : Observable<PlaylistTile[]> {
      return this._http
              .delete(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers')
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
   }

   /**
   * name: isPlaylistFollowingByUser
   * params: {String} ownerId
   * params: {String} playlistId
   * description: check if a playlist is followed by a user
   */
   isPlaylistFollowingByUser(ownerId: any, playlistId: string) : Observable<PlaylistTile[]> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers/contains?ids=' + this.userService.myId)
              .catch((error: any) => Observable.throw(error.error || 'Server error'));
   }
}
