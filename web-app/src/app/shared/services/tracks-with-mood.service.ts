import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { TrackMood } from '@shared/models';
import { APP_CONFIG } from 'app/shared/app.config';

@Injectable()
export class TracksWithMoodService {
  playedTracksAndTracksWithMood$: BehaviorSubject<Array<TrackMood>> = new BehaviorSubject<Array<TrackMood>>(null);

  constructor(private _http: HttpClient) {}

  /**
   * name: getAllTracksWithsMood
   * params:
   * description: get all track that have mood set OR that are already played using node server
   */
  getAllTracksWithsMood(): Observable<Array<TrackMood>> {
    return this._http.get<Array<any>>(APP_CONFIG.mainApiUrl + '/tracks-with-mood');
  }

  /**
   * name: getPlayedTracksAndTracksWithMood
   * params: tracksIds: Array<String>
   * description: get traks that are played AND have mood set  using node server
   */
  getPlayedTracksAndTracksWithMood(tracksIds: Array<String>): Observable<Array<TrackMood>> {
    let params: HttpParams = new HttpParams();
    if (tracksIds) {
      params = params.set('tracksIds', tracksIds.toString());
    }

    return this._http.get<any>(APP_CONFIG.mainApiUrl + '/played-tracks-with-mood', { params: params });
  }

  /**
   * name: setTrackWithMood
   * params: mood: TrackMood
   * description: create track with mood  using node server
   */
  setTrackWithMood(mood: TrackMood): Observable<TrackMood> {
    return this._http.post<any>(APP_CONFIG.mainApiUrl + '/tracks-with-mood', mood);
  }

  /**
   * name: updateMoodByTrackId
   * params: trackId: String
   * params: moodName: String
   * description: update mood in the track  using node server
   */
  updateMoodByTrackId(trackId: String, moodName: string): Observable<TrackMood> {
    const mood = {
      mood: moodName
    };
    return this._http.put<any>(APP_CONFIG.mainApiUrl + '/moods/' + trackId, mood);
  }

  /**
   * name: updatePlaysCountByTrackId
   * params: trackId: String
   * params: moodName: String
   * description: update plays count in the track  using node server
   */
  updatePlaysCountByTrackId(trackId: String, plays: number): Observable<TrackMood> {
    const playsCount = {
      plays: plays
    };
    return this._http.put<any>(APP_CONFIG.mainApiUrl + '/plays-count/' + trackId, playsCount);
  }
}
