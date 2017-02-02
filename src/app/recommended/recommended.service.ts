import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpInterceptorService } from './../shared/services/http-interceptor.service';
import { APP_CONFIG } from './../shared/app.config';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import { UserService } from './../shared/services/user.service';

@Injectable()

export class RecommendedService {

  constructor(private http: HttpInterceptorService,
             private userService: UserService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getFeaturedPlaylists(): Observable<PlaylistTile[]> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/browse/featured-playlists')
              .map((res: Response) => res.json().playlists.items)
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * name: getNewReleasedAlbums
   * description: get recommended tracks
   */
//   getNewReleasedAlbums(): Observable<PlaylistTile[]> {
//       return this.http
//               .get(APP_CONFIG.apiMainUrl + '/browse/new-releases?limit=7')
//               .map((res: Response) => res.json().albums.items)
//               .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
//   }

   /**
   * name: followFeaturedPlaylists
   * params: {String} ownerId
   * params: {String} playlistId
   * description: user can follow a plalist
   */
  followFeaturedPlaylists(ownerId: string, playlistId: string) : Observable<PlaylistTile[]> {
      return this.http
              .put(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers')
              .map((res: Response) => res)
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   /**
   * name: unfollowFeaturedPlaylists
   * params: {String} ownerId
   * params: {String} playlistId
   * description: user can follow a plalist
   */
  unfollowFeaturedPlaylists(ownerId: string, playlistId: string) : Observable<PlaylistTile[]> {
      return this.http
              .delete(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers')
              .map((res: Response) => res)
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   /**
   * name: isPlaylistFollowingByUser
   * params: {String} ownerId
   * params: {String} playlistId
   * description: check if a playlist is followed by a user
   */
   isPlaylistFollowingByUser(ownerId: any, playlistId: string) : Observable<PlaylistTile[]> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/users/' + ownerId + '/playlists/' + playlistId + '/followers/contains?ids=' + this.userService.myId)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}
