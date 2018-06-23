import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { TracksWithMoodService, PlayerService } from '@shared/services';
import { TrackMood, Track } from '@shared/models';
import { ITrackMood } from '../../../../../../shared/interfaces/track-mood.interface';

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

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
export class TrackComponent implements OnInit, OnDestroy {
  @Input() track: Track;
  @Input() isMoodEditable: boolean;
  @Input() hideNotPlayedTracks: boolean;
  @Output() onTrackPlay: EventEmitter<any> = new EventEmitter<any>(null);

  showAllMoods = false;
  trackPlaysConter = 0;
  selectedMood = 'happy';
  isTrackPlayed = false;
  isTrackPaused = false;
  isTrackSelected = false;
  startPlaying = false;

  private _currentPlayedTrackOrTrackWithMood: ITrackMood;
  private _playerStateSubscription: Subscription;

  constructor(
    private _moodService: TracksWithMoodService,
    private _datePipe: DatePipe,
    private _playerService: PlayerService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to observable that holds all tracks with mood or played tracks
    this._moodService.playedTracksAndTracksWithMood$.subscribe((tracks) => {
      if (tracks && tracks.length) {
        this._currentPlayedTrackOrTrackWithMood = tracks.find((track) => track.trackId === this.track.id);
        // If the current track is already played or have mood, update it in the view
        if (this._currentPlayedTrackOrTrackWithMood) {
          this.trackPlaysConter = this._currentPlayedTrackOrTrackWithMood.plays;
          this.selectedMood = this._currentPlayedTrackOrTrackWithMood.mood;
        }
      }

      this._playerStateSubscription = this._playerService.playerState$.subscribe((state) => {
        if (!state) return;
        // Deselect track when it finished playing
        if (
          state.track_window.current_track.id === this.track.id &&
          state.position === 0 &&
          state.paused &&
          !this.startPlaying
        ) {
          this.deselectTrack();
          this._cd.detectChanges();
        }
      });
    });
  }

  playTrack() {
    this.startPlaying = true;
    this._playerService
      .playTrack({
        playerInstance: this._playerService.player,
        spotify_uri: this.track.uri,
        device_id: this._playerService.device_id
      })
      .subscribe(() => {
        this.isTrackPlayed = true;
        this.isTrackSelected = true;
        this._cd.detectChanges();

        // for playerStateChange initial state on play is the same as on finish,
        // so use this flag to skip first change and correctly deselect track only when finish
        setTimeout(() => {
          this.startPlaying = false;
        }, 1000);

        this._saveTrackInfo(true, false);
      });
  }

  pauseTrack() {
    this._playerService
      .pauseTrack({
        playerInstance: this._playerService.player,
        device_id: this._playerService.device_id
      })
      .subscribe(() => {
        this.isTrackPaused = true;
        this.isTrackPlayed = false;
        this._cd.detectChanges();
      });
  }

  resumeTrack() {
    this._playerService
      .resumeTrack({
        playerInstance: this._playerService.player,
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

  ngOnDestroy() {
    this._playerStateSubscription.unsubscribe();
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

    // If track is not played and have no mood, save it
    if (!this._currentPlayedTrackOrTrackWithMood) {
      this._moodService.setTrackWithMood(mood).subscribe((data) => {
        if (data) {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        }
      });
    } else {
      // Update plays count when play track
      if (isTrackPlayed) {
        this._moodService.updatePlaysCountByTrackId(this.track.id, mood.plays).subscribe((data) => {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        });
      }
      // Update mood when mood is set
      if (isMoodChanged) {
        this._moodService.updateMoodByTrackId(this.track.id, mood.mood).subscribe((data) => {
          if (!data) return;
          this._updatePlayedTracksAndTracksWithMood(data);
        });
      }
    }
  }

  private _updatePlayedTracksAndTracksWithMood(newTrack) {
    // update observable that holds played tracks and tracks with mood,
    // if track is saved ot updated
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
    this.onTrackPlay.emit(_currentPlayedTracksAndTracksWithMood);
  }
}
