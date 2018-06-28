import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../../shared/app.config';
import { AuthClientService } from './auth.service';

@Injectable()
export class PlayerService {
  player;
  token = sessionStorage.getItem('access_token');
  device_id: string;
  playerState$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient, private _authService: AuthClientService) {}

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
    window.onSpotifyWebPlaybackSDKReady = () => this._playerStartHandler();
  }

  stopPlayer() {
    if (this.player) {
      // window.removeEventListener('onSpotifyWebPlaybackSDKReady', this._playerStartHandler.bind(this));
      window.onSpotifyWebPlaybackSDKReady = () => {};
      this.player.removeListener('authentication_error');
      this.player.removeListener('player_state_changed');
      this.player.removeListener('ready');
      this.player.removeListener('not_ready');
      this.player.disconnect();
    }
  }

  private _playerStartHandler() {
    this.player = new Spotify.Player({
      name: 'Music Catalog',
      getOAuthToken: (cb) => {
        cb(this.token);
      }
    });

    this.player.addListener('authentication_error', (e) => {
      console.log(e);
      this.stopPlayer();
      this._authService.logout();
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
  }
}
