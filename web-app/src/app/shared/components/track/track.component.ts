import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { MoodService } from '@shared/services';
import { TrackMood } from '@shared/models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({transform: 'scale(1)'})),
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
      if (data && data[0] && data[0].plays > 0) {
        this._playedTracksIds.push(data[0].trackId);
        this.trackPlaysConter = data[0].plays;
        this.selectedMood = data[0].mood;
      }
    });
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    // setTimeout(() => {
    //   document.getElementById('track-frame').contentDocument.getElementById('play-button').click();      
    // }, 1000)

    const mood = new TrackMood({
      trackId: this.track.id,
      plays: this.trackPlaysConter + 1,
      mood: this.selectedMood
    });

    if (this._playedTracksIds.indexOf(this.track.id) === -1) {
      // Create mood
      this._moodService.setMood(mood).subscribe((data) => {
        if (data) {
          this.trackPlaysConter = data.plays;
        }
      });
    } else {
      // Update mood
      this._moodService.updateMood(this.track.id, mood).subscribe((data) => {
        if (data) {
          this.trackPlaysConter = data.plays;
        }
      });
    }
    
  }

  selectMood(mood) {
    this.selectedMood = mood;
    this.showAllMoods = false;
  }

}
