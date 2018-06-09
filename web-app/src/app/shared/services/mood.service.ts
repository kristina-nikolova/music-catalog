import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoodService {

  constructor(private _http: HttpClient) {};

  getMoods(): Observable<Array<any>> {
    return this._http.get<Array<any>>('http://localhost:3000/api/moods');
  }

  getMoodByTrackId(trackId: String): Observable<any> {
    return this._http.get<any>('http://localhost:3000/api/moods/' + trackId);
  }

  setMood(mood: any): Observable<any> {
    return this._http.post<any>('http://localhost:3000/api/moods', mood);
  }

  updateMood(trackId: String, mood: any): Observable<any> {
    return this._http.put<any>('http://localhost:3000/api/moods/' + trackId, mood);
  }

}
