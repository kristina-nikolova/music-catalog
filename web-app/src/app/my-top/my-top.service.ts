import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Track } from '@shared/models';
import { APP_CONFIG } from './../shared/app.config';

@Injectable()
export class MyTopService {
  constructor(private _http: HttpClient) {}

  /**
   * name: getTrackById
   * params: {Object} id
   * description: get track information by trackId using spotify api
   */
  getTrackById(id: Object): Observable<Track> {
    return this._http
      .get(APP_CONFIG.apiSpotifyUrl + '/tracks/' + id)
      .map((res) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
