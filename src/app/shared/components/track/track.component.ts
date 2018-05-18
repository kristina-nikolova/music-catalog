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
  playsConter = 0;

  constructor(
    private _moodService: MoodService
  ) { }

  ngOnInit() {
    //TODO: check why this not return data
    this._moodService.getMoodByTrackId(this.track.id).subscribe((data) => {
      if (data && data.plays && data.plays > 0) {
        this.playsConter = data.plays;
      }
    });
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    //TODO: use model
    //TODO: automaticaly generate _id
    const mood = {
      _id: Math.random(),
      trackId: this.track.id,
      plays: this.playsConter + 1,
      mood: 'happy'
    }
    this._moodService.setMood(mood).subscribe((data) => {
      if (data) {
        this.playsConter = data.plays;
      }
    });
  }

}
