import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { MoodService } from '@shared/services';
import { TrackMood } from '@shared/models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({transform: 'none'})),
      transition('void => *', [
        style({transform: 'scale(0)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'scale(1)'}))
      ])
    ])
  ]
})

export class TrackComponent implements OnInit {
  @Input() track: any;
  @Input() isMoodWindowShown: boolean;
  @Input() hideNotPlayed: boolean;
  
  trackUri: any;
  trackPlaysConter = 0;
  showAllMoods = false;
  selectedMood = 'happy';

  private _playedTracksIds = [];

  constructor(
    private _moodService: MoodService
  ) { }

  ngOnInit() {
    this._moodService.getMoodByTrackId(this.track.id).subscribe((data) => {
      if (data && data[0]) {
        this._playedTracksIds.push(data[0].trackId);
        this.trackPlaysConter = data[0].plays;
        this.selectedMood = data[0].mood;
      }
    });
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri + '?autoplay=1';
    trackIframe.src = this.trackUri;

    // setTimeout(() => {  
    //   // document.getElementById('track-frame').contentDocument.getElementById('play-button').click();      
    // }, 1000)

    this._saveMood(true);
  }

  selectMood(mood) {
    this.selectedMood = mood;
    this.showAllMoods = false;
    this._saveMood();
  }

  private _saveMood(isCountChanged?: boolean) {
    const mood = new TrackMood({
      trackId: this.track.id,
      plays: isCountChanged ? this.trackPlaysConter + 1 : this.trackPlaysConter,
      mood: this.selectedMood
    });

    if (this._playedTracksIds.indexOf(this.track.id) === -1) {
      // Create mood
      this._moodService.setMood(mood).subscribe((data) => {
        if (data) {
          if (isCountChanged) {
            this.trackPlaysConter = data.plays;
          }
        }
      });
    } else {
      // Update mood
      this._moodService.updateMood(this.track.id, mood).subscribe((data) => {
        if (data) {
          if (isCountChanged) {
            this.trackPlaysConter = data.plays;
          }
        }
      });
    }
  }

}
