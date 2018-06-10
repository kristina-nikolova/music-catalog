import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Playlist, TrackMood } from '@shared/models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent{
  @Input() playlist: Playlist;
  @Input() playedTracksAndTracksWithMood: Array<TrackMood>;  
  
  constructor() { }

}
