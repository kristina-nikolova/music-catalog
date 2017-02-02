import { Component, OnInit, Input } from '@angular/core';

import { Playlist } from './../../../shared/model/playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Input() playlist: Playlist;

  constructor() { }

  ngOnInit() {
  }

}
