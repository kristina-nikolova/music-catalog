import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpInterceptorService } from './../shared/services/http-interceptor.service';
import { APP_CONFIG } from './../shared/app.config';

import { Track } from './../shared/model/track.model';

@Injectable()

export class MyTopService {

  constructor(private http: HttpInterceptorService) {};

  /**
   * name: getTrackById
   * params: {Object} id
   * description: get track by id
   */
  getTrackById(id: Object): Observable<Track> {
      return this.http
              .get(APP_CONFIG.apiMainUrl + '/tracks/' + id)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}
