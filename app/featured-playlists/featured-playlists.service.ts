import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClientService } from './../shared/services/http-client.service';
import { APP_CONFIG } from './../shared/app.config';
import { Playlist } from './../shared/model/playlist.model';

@Injectable()

export class FeaturedPlaylistsService {

  constructor(private http: HttpClientService) {};

  /**
   * name: getFeaturedPlaylists
   * params:
   * description: get all Featured Playlists
   */
  getFeaturedPlaylists() : Observable<Playlist[]> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/browse/featured-playlists')
              .map((res:Response) => res.json().playlists.items)
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }
}
