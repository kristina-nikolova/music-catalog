import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { TrackMood } from '@shared/models';

@Injectable()
export class TracksWithMoodService {
  playedTracksAndTracksWithMood$: BehaviorSubject<Array<TrackMood>> = new BehaviorSubject<Array<TrackMood>>(null);

  constructor(private _http: HttpClient) {}

  getAllTracksWithsMood(): Observable<Array<TrackMood>> {
    return this._http.get<Array<any>>('http://localhost:3000/api/tracks-with-mood');
  }

  // getTrackWithMoodByTrackId(trackId: String): Observable<TrackMood> {
  //   return this._http.get<any>('http://localhost:3000/api/moods/' + trackId);
  // }

  getPlayedTracksAndTracksWithMood(tracksIds: Array<String>): Observable<Array<TrackMood>> {
    let params: HttpParams = new HttpParams();
    if (tracksIds) {
      params = params.set('tracksIds', tracksIds.toString());
    }

    return this._http.get<any>('http://localhost:3000/api/played-tracks-with-mood', { params: params });
  }

  setTrackWithMood(mood: TrackMood): Observable<TrackMood> {
    return this._http.post<any>('http://localhost:3000/api/tracks-with-mood', mood);
  }

  updateMoodByTrackId(trackId: String, moodName: string): Observable<TrackMood> {
    const mood = {
      mood: moodName
    };
    return this._http.put<any>('http://localhost:3000/api/moods/' + trackId, mood);
  }

  updatePlaysCountByTrackId(trackId: String, plays: number): Observable<TrackMood> {
    const playsCount = {
      plays: plays
    };
    return this._http.put<any>('http://localhost:3000/api/plays-count/' + trackId, playsCount);
  }
}
