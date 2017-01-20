import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from './../app.config';
import { Playlist } from './../shared/model/playlist.model';

@Injectable()

export class FeaturedPlaylistsService {
  private token = sessionStorage.getItem('access_token');

  constructor(private http: Http) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getFeaturedPlaylists() : Observable<Playlist[]> {
      let headers = new Headers({ 'authorization': 'Bearer ' + this.token});
      let options = new RequestOptions({ headers: headers });
      
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/browse/featured-playlists', options)
              .map((res:Response) => res.json().playlists.items)
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }
}
