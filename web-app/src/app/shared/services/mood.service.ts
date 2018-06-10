import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { TrackMood } from '@shared/models';

@Injectable()
export class MoodService {

  constructor(private _http: HttpClient) {};

  getMoods(): Observable<Array<TrackMood>> {
    return this._http.get<Array<any>>('http://localhost:3000/api/moods');
  }

  getMoodByTrackId(trackId: String): Observable<TrackMood> {
    return this._http.get<any>('http://localhost:3000/api/moods/' + trackId);
  }

  setMood(mood: TrackMood): Observable<TrackMood> {
    return this._http.post<any>('http://localhost:3000/api/moods', mood);
  }

  updateMood(trackId: String, mood: TrackMood): Observable<TrackMood> {
    return this._http.put<any>('http://localhost:3000/api/moods/' + trackId, mood);
  }

}
