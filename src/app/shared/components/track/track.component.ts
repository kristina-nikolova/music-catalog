import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {
  @Input() track: any;
  trackUri: any;
  playsConter: number;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.playsConter = this.localStorageService.get(this.track.id) ?
                       this.localStorageService.get(this.track.id)['plays'] : 0;
   }

  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    this.localStorageService.set(this.track.id, {
      plays: this.playsConter + 1,
      mood: 'happy'
    });

    this.playsConter = this.localStorageService.get(this.track.id)['plays'];

    // setTimeout(function(){
    //   document.getElementById('play-button').click();
    // }, 3000);
  }

}
