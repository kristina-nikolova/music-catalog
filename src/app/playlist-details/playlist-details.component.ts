import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Playlist } from './../shared/model/playlist.model';
import { MyPlaylistsService } from './../my-playlists/my-playlists.service';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './playlist-details.component.html'
})

export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist;
  playlistId: string;
  userId: string;
  isDataLoading: boolean;

  constructor(private route: ActivatedRoute,
              private myPlaylistsService: MyPlaylistsService) {
      this.playlistId = route.snapshot.params['id'];
      this.userId = route.snapshot.params['user'];
  }

  ngOnInit() {
    this.isDataLoading = true;
    this.myPlaylistsService.getMyPlaylistById(this.playlistId, this.userId)
      .subscribe(
        (data) => {
          this.playlist = data;

          this.myPlaylistsService.getMyPlaylistCreator(data.owner['id']).subscribe(
            (res) => {
              this.playlist.owner['name'] = res.display_name;
            },
            (err) => { console.log(err); }
          );

          this.isDataLoading = false;
        },
        (err) => { console.log(err); }
      );
  }

}
