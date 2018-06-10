import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { TrackMood } from '@shared/models';

@Injectable()
export class MoodService {

  constructor(private _http: HttpClient) {};

  getAllTracksWithsMood(): Observable<Array<TrackMood>> {
    return this._http.get<Array<any>>('http://localhost:3000/api/moods');
  }

  getTrackWithMoodByTrackId(trackId: String): Observable<TrackMood> {
    return this._http.get<any>('http://localhost:3000/api/moods/' + trackId);
  }

  getPlayedTracksAndTracksWithMood(tracksIds: Array<String>): Observable<Array<TrackMood>> {
    let params: HttpParams = new HttpParams();
    if (tracksIds) {
      params = params.set('tracksIds', tracksIds.toString());
    }

    return this._http.get<any>('http://localhost:3000/api/played-tracks-with-mood', { params: params });
  }

  setTrackWithMood(mood: TrackMood): Observable<TrackMood> {
    return this._http.post<any>('http://localhost:3000/api/moods', mood);
  }

  updateTrackWithMood(trackId: String, mood: TrackMood): Observable<TrackMood> {
    return this._http.put<any>('http://localhost:3000/api/moods/' + trackId, mood);
  }

}