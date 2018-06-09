import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from './../shared/app.config';
import { Track } from '@shared/models';

@Injectable()

export class MyTopService {

  constructor(private _http: HttpClient) {};

  /**
   * name: getTrackById
   * params: {Object} id
   * description: get track by id
   */
  getTrackById(id: Object): Observable<Track> {
      return this._http
              .get(APP_CONFIG.apiMainUrl + '/tracks/' + id)
              .map((res) => res)
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}
