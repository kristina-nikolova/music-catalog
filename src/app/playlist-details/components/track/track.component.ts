import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {
  @Input() track: any;

  trackUri: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() { }
  
  playTrack(trackIframe) {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
    trackIframe.src = this.trackUri;

    // setTimeout(function(){
    //   document.getElementById('play-button').click();
    // }, 3000);
  }

}
