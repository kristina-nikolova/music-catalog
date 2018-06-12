import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { TracksWithMoodService } from '@shared/services';
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
  @Input() isMoodEditable: boolean;
  @Input() hideNotPlayedTracks: boolean;

  trackUri: string;
  showAllMoods = false;
  trackPlaysConter = 0;
  selectedMood = 'happy';

  private _currentPlayedTrackOrTrackWithMood: TrackMood;

  constructor(private _moodService: TracksWithMoodService) {}

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
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri + '?autoplay=1';
    trackIframe.src = this.trackUri;
    // TODO: update this._moodService.playedTracksAndTracksWithMood$
    this._saveTrackMood(true, false);
  }

  selectMood(mood) {
    this.selectedMood = mood;
    this.showAllMoods = false;
    // TODO: update this._moodService.playedTracksAndTracksWithMood$
    this._saveTrackMood(false, true);
  }

  private _saveTrackMood(isTrackPlayed?: boolean, isMoodChanged?: boolean) {
    let _today = new Date();
    const mood = new TrackMood({
      trackId: this.track.id,
      plays: isTrackPlayed ? this.trackPlaysConter + 1 : this.trackPlaysConter,
      mood: this.selectedMood,
      date: _today.getDate() + '/' + (_today.getMonth() + 1) + '/' + _today.getFullYear()
    });

    if (!this._currentPlayedTrackOrTrackWithMood) {
      // Create mood
      this._moodService.setTrackWithMood(mood).subscribe((data) => {
        if (data) {
          if (isTrackPlayed) {
            this.trackPlaysConter = data.plays;
          }
        }
      });
    } else {
      // Update mood
      if (isTrackPlayed) {
        this._moodService.updatePlaysCountByTrackId(this.track.id, mood.plays).subscribe((data) => {
          if (!data) return;
          this.trackPlaysConter = data.plays;
        });
      }
      if (isMoodChanged) {
        this._moodService.updateMoodByTrackId(this.track.id, mood.mood).subscribe();
      }
    }
  }
}
