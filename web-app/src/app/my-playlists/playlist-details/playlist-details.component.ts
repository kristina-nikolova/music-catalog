import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { MyPlaylistsService } from '../my-playlists.service';
import { Playlist, TrackMood } from '@shared/models';
import { TracksWithMoodService, PlayerService } from '@shared/services';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './playlist-details.component.html'
})
export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist;
  playlistId: string;
  userId: string;
  isDataLoading: boolean;

  private _tracksIds = [];

  constructor(
    private _route: ActivatedRoute,
    private _myPlaylistsService: MyPlaylistsService,
    private _moodService: TracksWithMoodService,
    private _playerService: PlayerService
  ) {
    this.playlistId = _route.snapshot.params['id'];
    this.userId = _route.snapshot.params['user'];
  }

  ngOnInit() {
    this.isDataLoading = true;

    this._myPlaylistsService.getMyPlaylistById(this.playlistId, this.userId).subscribe(
      (data) => {
        this.isDataLoading = false;
        this.playlist = data;

        this._tracksIds = this.playlist.tracks.items.map((item) => item.track.id);
        this._moodService.getPlayedTracksAndTracksWithMood(this._tracksIds).subscribe((data) => {
          if (!data) return;
          this._moodService.playedTracksAndTracksWithMood$.next(data);
        });

        this._myPlaylistsService.getMyPlaylistCreator(data.owner['id']).subscribe(
          (res) => {
            this.playlist.owner['name'] = res.display_name;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
