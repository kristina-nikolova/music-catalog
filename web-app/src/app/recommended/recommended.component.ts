import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RecommendedService } from './recommended.service';
import { PlaylistTile } from '@shared/models';
import * as _ from 'lodash';

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

    //TODO: update follow property in playlists when it is ready
    this._recommendedService.getFeaturedPlaylists().subscribe((data) => {
      this.isDataLoading = false;
      data.map((p) => {
        this._recommendedService.isPlaylistFollowingByUser(p.owner.id, p.id).subscribe((res) => {
          p['followed'] = res[0];
        });
      });
      this.playlists = data;
    });
  }

  followPlaylist(data) {
    const _self = this;
    const playlist = data;
    this.isFolowing = true;

    this._recommendedService
      .followFeaturedPlaylists(playlist.ownerId, playlist.playlistId)
      .delay(1000)
      .subscribe((data) => {
        this.isFolowing = false;
        _.forEach(_self.playlists, function(pl) {
          if (pl.id === playlist.playlistId) {
            pl.followed = true;
          }
        });
      });
  }

  unfollowPlaylist(data) {
    const _self = this;
    const playlist = data;
    this.isFolowing = true;

    this._recommendedService
      .unfollowFeaturedPlaylists(data.ownerId, data.playlistId)
      .delay(1000)
      .subscribe((data) => {
        this.isFolowing = false;
        _.forEach(_self.playlists, function(pl) {
          if (pl.id === playlist.playlistId) {
            pl.followed = false;
          }
        });
      });
  }
}
