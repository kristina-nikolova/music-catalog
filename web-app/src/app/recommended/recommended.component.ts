import { Component, OnInit } from '@angular/core';

import { PlaylistTile } from '@shared/models';
import * as _ from 'lodash';
import { RecommendedService } from './recommended.service';

@Component({
  providers: [RecommendedService],
  templateUrl: './recommended.component.html'
})
export class RecommendedComponent implements OnInit {
  playlists: Array<PlaylistTile>;
  isDataLoading: boolean;
  isFolowing: boolean;

  constructor(private _recommendedService: RecommendedService) {}

  ngOnInit() {
    this.loadFeaturedPlaylists();
  }

  loadFeaturedPlaylists() {
    this.isDataLoading = true;

    this._recommendedService.getFeaturedPlaylists().subscribe((data) => {
      this.isDataLoading = false;
      this.playlists = data;

      this.playlists.map((p) => {
        this._recommendedService.isPlaylistFollowingByUser(p.owner.id, p.id).subscribe((res) => {
          p['followed'] = res[0];
        });
      });
    });
  }

  followPlaylist(playlist) {
    this.isFolowing = true;

    this._recommendedService
      .followFeaturedPlaylists(playlist.ownerId, playlist.playlistId)
      .delay(1000)
      .subscribe((data) => {
        this.isFolowing = false;
        _.forEach(this.playlists, function(pl) {
          if (pl.id === playlist.playlistId) {
            pl.followed = true;
          }
        });
      });
  }

  unfollowPlaylist(playlist) {
    this.isFolowing = true;

    this._recommendedService
      .unfollowFeaturedPlaylists(playlist.ownerId, playlist.playlistId)
      .delay(1000)
      .subscribe((data) => {
        this.isFolowing = false;
        _.forEach(this.playlists, function(pl) {
          if (pl.id === playlist.playlistId) {
            pl.followed = false;
          }
        });
      });
  }
}
