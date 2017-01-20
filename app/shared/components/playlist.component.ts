import { Component, Input } from '@angular/core';

import { Playlist } from '../model/playlist.model';

@Component({
  selector: 'playlist',
  template: `
    <div class="playlist">
      <img [src]="playlistCover" alt="playlist cover" class="palylist__image" />
      <div>{{ playlistName }}</div>
    </div>
  `,
})

export class PlaylistComponent {
  @Input() playlistCover: String;
  @Input() playlistName: String;
}
