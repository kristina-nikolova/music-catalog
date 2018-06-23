import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Playlist } from '@shared/models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  @Input() playlist: Playlist;

  constructor() {}
}
