import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {
  @Input() track: any;

  trackUri: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.trackUri = 'https://embed.spotify.com/?uri=' + this.track.uri;
  }

  transformURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.trackUri);
  }

}
