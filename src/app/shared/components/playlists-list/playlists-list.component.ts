import { PlaylistTile } from './../../model/playlist-tile.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playlists-list',
  templateUrl: './playlists-list.component.html',
  styleUrls: ['./playlists-list.component.css']
})
export class PlaylistsListComponent implements OnInit {

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
