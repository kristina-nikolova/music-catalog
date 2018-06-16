import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from '../../shared/app.config';

@Injectable()
export class PlayerService {
  player;
  token = sessionStorage.getItem('access_token');
  device_id: string;
  playerState$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) {}

  playTrack = ({ spotify_uri, playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>(
      'https://api.spotify.com/v1/me/player/play?device_id=' + device_id,
      JSON.stringify({ uris: [spotify_uri] })
    );
  };

  resumeTrack = ({ playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>('https://api.spotify.com/v1/me/player/play?device_id=' + device_id, null);
  };

  pauseTrack = ({ playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>('https://api.spotify.com/v1/me/player/pause?device_id=' + device_id, null);
  };

  startPlayer() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Music Catalog',
        getOAuthToken: (cb) => {
          cb(this.token);
        }
      });

      this.player.addListener('player_state_changed', (state) => {
        console.log(state);
        this.playerState$.next(state);
      });

      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.device_id = device_id;
      });

      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      this.player.connect();
    };
  }
}
