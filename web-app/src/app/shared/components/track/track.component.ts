import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { MoodService } from '@shared/services';
import { TrackMood, Track } from '@shared/models';

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
  ]
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  @Input() playedTracksAndTracksWithMood: Array<TrackMood>;
  @Input() isMoodEditable: boolean;
  @Input() hideNotPlayedTracks: boolean;

  trackUri: string;
  showAllMoods = false;
  trackPlaysConter = 0;
  selectedMood = 'happy';

  private _currentPlayedTrackOrTrackWithMood: TrackMood;

  constructor(private _moodService: MoodService) {}

  ngOnInit() {
    // TODO: make it with observable
    setTimeout((_) => {
      if (this.playedTracksAndTracksWithMood && this.playedTracksAndTracksWithMood.length) {
        this._currentPlayedTrackOrTrackWithMood = this.playedTracksAndTracksWithMood.find(
          (track) => track.trackId === this.track.id
        );
        if (this._currentPlayedTrackOrTrackWithMood) {
          this.trackPlaysConter = this._currentPlayedTrackOrTrackWithMood.plays;
          this.selectedMood = this._currentPlayedTrackOrTrackWithMood.mood;
        }
      }
    }, 1500);
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri + '?autoplay=1';
    trackIframe.src = this.trackUri;

    this._saveTrackMood(true);
  }

  selectMood(mood) {
    this.selectedMood = mood;
    this.showAllMoods = false;
    this._saveTrackMood();
  }

  private _saveTrackMood(isCountChanged?: boolean) {
    let _today = new Date();
    const mood = new TrackMood({
      trackId: this.track.id,
      plays: isCountChanged ? this.trackPlaysConter + 1 : this.trackPlaysConter,
      mood: this.selectedMood,
      date: _today.getDate() + '/' + (_today.getMonth() + 1) + '/' + _today.getFullYear()
    });

    if (!this._currentPlayedTrackOrTrackWithMood) {
      // Create mood
      this._moodService.setTrackWithMood(mood).subscribe((data) => {
        if (data) {
          if (isCountChanged) {
            this.trackPlaysConter = data.plays;
          }
        }
      });
    } else {
      // Update mood
      this._moodService.updateTrackWithMood(this.track.id, mood).subscribe((data) => {
        if (data) {
          if (isCountChanged) {
            this.trackPlaysConter = data.plays;
          }
        }
      });
    }
  }
}
