import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';

// import { LocalStorageService } from 'angular-2-local-storage';
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
  playsConter: number;

  constructor(
    // private localStorageService: LocalStorageService,
    private _moodService: MoodService
  ) { }

  ngOnInit() {
    // this.playsConter = this.localStorageService.get(this.track.id) ?
    //                    this.localStorageService.get(this.track.id)['plays'] : 0;
    this._moodService.getMoodByTrackId(this.track.id).subscribe((data) => {
      if (!data) {
        this.playsConter = 0;
      } else {
        this.playsConter = data.plays;
      }
    });
  }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    // this.localStorageService.set(this.track.id, {
    //   plays: this.playsConter + 1,
    //   mood: 'happy'
    // });

    const mood = {
      _id: 1,
      trackId: this.track.id,
      plays: this.playsConter + 1,
      mood: 'happy'
    }
    this._moodService.setMood(mood).subscribe((data) => {
      debugger;
    });

    this._moodService.getMoodByTrackId(this.track.id).subscribe((data) => {
      this.playsConter = data.plays;
    });

    // this.playsConter = this.localStorageService.get(this.track.id)['plays'];
    
    // setTimeout(function(){
    //   document.getElementById('play-button').click();
    // }, 3000);
  }

}
