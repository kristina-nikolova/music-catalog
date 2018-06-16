import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { TracksWithMoodService, PlayerService } from '@shared/services';
import { TrackMood, Track } from '@shared/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({ transform: 'none' })),
      transition('void => *', [style({ transform: 'scale(0)' }), animate(200)]),
      transition('* => void', [animate(200, style({ transform: 'scale(1)' }))])
    ])
  ],
  providers: [DatePipe]
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  @Input() isMoodEditable: boolean;
  @Input() hideNotPlayedTracks: boolean;

  showAllMoods = false;
  trackPlaysConter = 0;
  selectedMood = 'happy';
  isTrackPlayed = false;
  isTrackPaused = false;
  isTrackSelected = false;

  private _currentPlayedTrackOrTrackWithMood: TrackMood;

  constructor(
    private _moodService: TracksWithMoodService,
    private _datePipe: DatePipe,
    private _playerService: PlayerService
  ) {}

  ngOnInit() {
    this._moodService.playedTracksAndTracksWithMood$.subscribe((tracks) => {
      if (tracks && tracks.length) {
        this._currentPlayedTrackOrTrackWithMood = tracks.find((track) => track.trackId === this.track.id);
        if (this._currentPlayedTrackOrTrackWithMood) {
          this.trackPlaysConter = this._currentPlayedTrackOrTrackWithMood.plays;
          this.selectedMood = this._currentPlayedTrackOrTrackWithMood.mood;
        }
      }
    });

    // Reset play button when track finished
    // this._playerService.player.addListener(
    //   'player_state_changed',
    //   ({ position, duration, track_window: { current_track } }) => {
    //     debugger;
    //     if (position === duration) {
    //       this.isTrackPaused = false;
    //       this.isTrackPlayed = false;
    //     }
    //   }
    // );
  }

  playTrack() {
    this.isTrackPlayed = true;
    this.isTrackSelected = true;
    this._saveTrackInfo(true, false);

    this._playerService
      .playTrack({
        playerInstance: this._playerService.playerInstance,
        spotify_uri: this.track.uri,
        device_id: this._playerService.device_id
      })
      .subscribe();
  }

  pauseTrack() {
    this._playerService
      .pauseTrack({
        playerInstance: this._playerService.playerInstance,
        device_id: this._playerService.device_id
      })
      .subscribe(() => {
        this.isTrackPaused = true;
        this.isTrackPlayed = false;
      });
  }

  resumeTrack() {
    this._playerService
      .resumeTrack({
        playerInstance: this._playerService.playerInstance,
        device_id: this._playerService.device_id
      })
      .subscribe(() => {
        this.isTrackPlayed = true;
        this.isTrackPaused = false;
      });
  }

  deselectTrack() {
    this.isTrackSelected = false;
    this.isTrackPlayed = false;
    this.isTrackPaused = false;
  }

  selectMood(mood) {
    this.selectedMood = mood;
    this.showAllMoods = false;
    this._saveTrackInfo(false, true);
  }

  private _saveTrackInfo(isTrackPlayed?: boolean, isMoodChanged?: boolean) {
    const now = Date.now();
    const formattedDate = this._datePipe.transform(now, 'shortDate');

    const mood = new TrackMood({
      trackId: this.track.id,
      plays: isTrackPlayed ? this.trackPlaysConter + 1 : this.trackPlaysConter,
      mood: this.selectedMood,
      date: formattedDate
    });

    if (!this._currentPlayedTrackOrTrackWithMood) {
      this._moodService.setTrackWithMood(mood).subscribe((data) => {
        if (data) {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        }
      });
    } else {
      if (isTrackPlayed) {
        this._moodService.updatePlaysCountByTrackId(this.track.id, mood.plays).subscribe((data) => {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        });
      }
      if (isMoodChanged) {
        this._moodService.updateMoodByTrackId(this.track.id, mood.mood).subscribe((data) => {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        });
      }
    }
  }

  private _updatePlayedTracksAndTracksWithMood(newTrack) {
    let _currentPlayedTracksAndTracksWithMood = this._moodService.playedTracksAndTracksWithMood$.getValue();

    let _findedTrack = _currentPlayedTracksAndTracksWithMood.find((tracks) => tracks.trackId === newTrack.trackId);
    if (_findedTrack) {
      _currentPlayedTracksAndTracksWithMood.map((tracks) => {
        if (tracks.trackId === newTrack.trackId) {
          tracks.plays = newTrack.plays;
          tracks.mood = newTrack.mood;
        }
      });
    } else {
      _currentPlayedTracksAndTracksWithMood = _currentPlayedTracksAndTracksWithMood.concat(newTrack);
    }
    this._moodService.playedTracksAndTracksWithMood$.next(_currentPlayedTracksAndTracksWithMood);
  }
}
