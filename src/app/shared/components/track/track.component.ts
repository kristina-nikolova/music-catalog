import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { MoodService } from '../../services/mood.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
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
  trackUri: any;
  trackPlaysConter = 0;

  private _playedTracksIds = [];

  constructor(
    private _moodService: MoodService
  ) { }

  ngOnInit() {
    this._moodService.getMoodByTrackId(this.track.id).subscribe((data) => {
      if (data && data[0] && data[0].plays > 0) {
        this._playedTracksIds.push(data[0].trackId);
        this.trackPlaysConter = data[0].plays;
      }
    });
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    //TODO: use models
    const mood = {
      trackId: this.track.id,
      plays: this.trackPlaysConter + 1,
      mood: 'happy'
    }

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

}
