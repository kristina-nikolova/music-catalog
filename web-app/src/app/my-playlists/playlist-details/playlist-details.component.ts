import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { MyPlaylistsService } from '../my-playlists.service';
import { Playlist } from '@shared/models';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './playlist-details.component.html'
})

export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist;
  playlistId: string;
  userId: string;
  isDataLoading: boolean;

  constructor(private _route: ActivatedRoute,
              private _myPlaylistsService: MyPlaylistsService) {
      this.playlistId = _route.snapshot.params['id'];
      this.userId = _route.snapshot.params['user'];
  }

  ngOnInit() {
    this.isDataLoading = true;

    this._myPlaylistsService.getMyPlaylistById(this.playlistId, this.userId)
      .subscribe(
        (data) => {
          this.playlist = data;

          this._myPlaylistsService.getMyPlaylistCreator(data.owner['id']).subscribe(
            (res) => {
              this.playlist.owner['name'] = res.display_name;
              this.isDataLoading = false;
            },
            (err) => { console.log(err); }
          );       
        },
        (err) => { console.log(err); }
      );
  }

}
