import { Playlist } from './../../model/playlist.model';
import { Component, OnInit, Input } from '@angular/core';

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
