import { Component, OnInit } from '@angular/core';

import { MyPlaylistsService } from './my-playlists.service';
import { PlaylistTile } from '@shared/models';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './my-playlists.component.html'
})
export class MyPlaylistsComponent implements OnInit {
  playlists: Array<PlaylistTile>;
  isDataLoading: boolean;

  constructor(private _myPlaylistsService: MyPlaylistsService) {}

  ngOnInit() {
    this._loadMyPlaylists();
  }

  private _loadMyPlaylists() {
    this.isDataLoading = true;
    this._myPlaylistsService.getMyPlaylists().subscribe((data) => {
      this.playlists = data;
      this.isDataLoading = false;
    });
  }
}
