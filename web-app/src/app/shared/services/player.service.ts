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

  /**
   * name: playTrack
   * params: { spotify_uri, playerInstance, device_id }
   * description: Play track using Spotify sdk
   */
  playTrack = ({ spotify_uri, playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>(
      APP_CONFIG.apiSpotifyUrl + '/me/player/play?device_id=' + device_id,
      JSON.stringify({ uris: [spotify_uri] })
    );
  };

  /**
   * name: resumeTrack
   * params: { playerInstance, device_id }
   * description: Resume track using Spotify sdk
   */
  resumeTrack = ({ playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>(APP_CONFIG.apiSpotifyUrl + '/me/player/play?device_id=' + device_id, null);
  };

  /**
   * name: pauseTrack
   * params: { playerInstance, device_id }
   * description: Pause track using Spotify sdk
   */
  pauseTrack = ({ playerInstance, device_id }): Observable<any> => {
    return this._http.put<any>(APP_CONFIG.apiSpotifyUrl + '/me/player/pause?device_id=' + device_id, null);
  };

  startPlayer() {
    // Create and connect spotify player
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Music Catalog',
        getOAuthToken: (cb) => {
          cb(this.token);
        }
      });

      this.player.addListener('player_state_changed', this._playerStateChangedHandler.bind(this));
      this.player.addListener('ready', this._playerReadyHandler.bind(this));
      this.player.addListener('not_ready', this._playerNotReadyHandler.bind(this));

      this.player.connect();
    };
  }

  stopPlayer() {
    this.player.removeListener('player_state_changed', this._playerStateChangedHandler.bind(this));
    this.player.removeListener('ready', this._playerReadyHandler.bind(this));
    this.player.removeListener('not_ready', this._playerNotReadyHandler.bind(this));
    this.player.disconnect();
  }

  private _playerStateChangedHandler(state) {
    console.log(state);
    this.playerState$.next(state);
  }

  private _playerReadyHandler({ device_id }) {
    console.log('Ready with Device ID', device_id);
    this.device_id = device_id;
  }

  private _playerNotReadyHandler({ device_id }) {
    console.log('Device ID has gone offline', device_id);
  }
}
