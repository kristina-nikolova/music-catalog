import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Playlist } from '../../shared/model/playlist.model';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  @Input() playlist: Playlist;

  constructor() { }

}
