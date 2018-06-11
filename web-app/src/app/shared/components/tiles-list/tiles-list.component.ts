import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PlaylistTile } from '@shared/models';

@Component({
  selector: 'app-tiles-list',
  templateUrl: './tiles-list.component.html',
  styleUrls: ['./tiles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TilesListComponent {
  @Input() title: string;
  @Input() playlists: PlaylistTile[];
  @Input() canFollowPlaylistItem: Boolean;
  @Input() playlistLink: string;
  @Input() isFolowing: Boolean;
  @Output() onPlaylistListFollowButtonClicked: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onPlaylistListUnfollowButtonClicked: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {}

  onPlaylistListFollowButtonClick(ownerId, playlistId) {
    this.onPlaylistListFollowButtonClicked.emit({
      ownerId: ownerId,
      playlistId: playlistId
    });
  }

  onPlaylistListUnfollowButtonClick(ownerId, playlistId) {
    this.onPlaylistListUnfollowButtonClicked.emit({
      ownerId: ownerId,
      playlistId: playlistId
    });
  }
}
