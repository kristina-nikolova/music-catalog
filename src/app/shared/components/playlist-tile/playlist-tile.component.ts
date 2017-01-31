import { PlaylistTile } from './../../model/playlist-tile.model';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-playlist-tile',
  templateUrl: './playlist-tile.component.html',
  styleUrls: ['./playlist-tile.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlaylistTileComponent {
  @Input() playlist: PlaylistTile;
  @Input() canFollow: Boolean;
  @Input() link: String;
  @Input() isFolowing: Boolean;
  @Output() onPlaylistFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPlaylistUnFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  onPlaylistFollowButtonClick() {
    this.onPlaylistFollowButtonClicked.emit();
  }

  onPlaylistUnFollowButtonClick() {
    this.onPlaylistUnFollowButtonClicked.emit();
  }
}
