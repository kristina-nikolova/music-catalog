import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Playlist } from '@shared/models';
import { TracksWithMoodService } from '@shared/services';
import 'rxjs/add/operator/switchMap';
import { MyPlaylistsService } from '../my-playlists.service';

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
    private _moodService: TracksWithMoodService
  ) {
    this.playlistId = _route.snapshot.params['id'];
    this.userId = _route.snapshot.params['user'];
  }

  ngOnInit() {
    this.isDataLoading = true;

    this._myPlaylistsService.getMyPlaylistById(this.playlistId, this.userId).subscribe((data) => {
      this.isDataLoading = false;
      this.playlist = data;

      // Get which spotify tracks have mood or are played from node server
      // and save it in observable to use it in track component
      this._tracksIds = this.playlist.tracks.items.map((item) => item.track.id);
      // tslint:disable-next-line:no-shadowed-variable
      this._moodService.getPlayedTracksAndTracksWithMood(this._tracksIds).subscribe((data) => {
        if (!data) return;
        this._moodService.playedTracksAndTracksWithMood$.next(data);
      });

      this._myPlaylistsService.getMyPlaylistCreator(data.owner['id']).subscribe((res) => {
        this.playlist.owner['name'] = res.display_name;
      });
    });
  }
}
