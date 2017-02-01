import { PlaylistTile } from './../../model/playlist-tile.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit {

  @Input() title: string;
  @Input() playlists: PlaylistTile[];
  @Input() canFollowPlaylistItem: Boolean;
  @Input() playlistLink: string;
  @Input() isFolowing: Boolean;
  @Output() onPlaylistListFollowButtonClicked: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onPlaylistListUnfollowButtonClicked: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() { }

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
