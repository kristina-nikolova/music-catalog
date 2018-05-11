import { Component, OnInit } from '@angular/core';

import { MyPlaylistsService } from './my-playlists.service';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import { MoodService } from './../shared/services/mood.service';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './my-playlists.component.html'
})

export class MyPlaylistsComponent implements OnInit {
  playlists: PlaylistTile[];
  isDataLoading: boolean;

  constructor(private _myPlaylistsService: MyPlaylistsService, private _moodService: MoodService) {}

  ngOnInit() {
    this.loadMyPlaylists();
  }

  loadMyPlaylists() {
    this.isDataLoading = true;
    this._myPlaylistsService.getMyPlaylists()
        .subscribe(
            (data) => {
              this.playlists = data;
              this.isDataLoading = false;
            },
            (err) => { console.log(err); }
         );
  }
}

