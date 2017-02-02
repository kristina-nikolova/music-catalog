import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RecommendedService } from './recommended.service';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import * as _ from 'lodash';

@Component({
  providers: [RecommendedService],
  templateUrl: './recommended.component.html'
})

export class RecommendedComponent implements OnInit {
  playlists: PlaylistTile[];
  // albums: PlaylistTile[];
  isDataLoading: boolean;
  isFolowing: boolean;
  constructor(private recommendedService: RecommendedService) {}

  ngOnInit() {
    this.loadFeaturedPlaylists();
  }

  loadFeaturedPlaylists() {
    this.isDataLoading = true;

    this.recommendedService.getFeaturedPlaylists()
      .flatMap(data => {
        this.playlists = data;
        this.isDataLoading = false;
        return this.playlists;
      })
      .subscribe(data => {
        const _data = data;
        this.recommendedService.isPlaylistFollowingByUser(data.owner['id'], data.id).subscribe(
          (res) => {
            // _data = {..._data, followed: true};
            _data['followed'] = res[0];
          },
          (err) => { console.log(err); }
        );
      });

      // this.recommendedService.getNewReleasedAlbums()
      //   .subscribe(data => {
      //       this.albums = data;
      //     },
      //     (err) => { console.log(err); }
      //   );
  }

  followPlaylist(data) {
    const _self = this;
    const playlist = data;

    this.recommendedService.followFeaturedPlaylists(playlist.ownerId, playlist.playlistId).subscribe(
      (data) => {
        _self.isFolowing = true;

        setTimeout(function() {
          _self.isFolowing = false;
          _.forEach(_self.playlists, function(pl){
            if (pl.id === playlist.playlistId) {
              pl.followed = true;
            }
          });
        }, 1000);
      },
      (err) => { console.log(err); }
    );
  }

  unfollowPlaylist(data) {
    const _self = this;
    const playlist = data;

    this.recommendedService.unfollowFeaturedPlaylists(data.ownerId, data.playlistId).subscribe(
      (data) => {
        _self.isFolowing = true;
        setTimeout(function() {
          _self.isFolowing = false;
          _.forEach(_self.playlists, function(pl){
            if (pl.id === playlist.playlistId) {
              pl.followed = false;
            }
          });
        }, 1000);
      },
      (err) => { console.log(err); }
    );
  }
}
