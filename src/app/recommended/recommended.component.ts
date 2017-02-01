import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FeaturedPlaylistsService } from './recommended.service';
import { PlaylistTile } from './../shared/model/playlist-tile.model';
import * as _ from 'lodash';

@Component({
  providers: [FeaturedPlaylistsService],
  templateUrl: './recommended.component.html'
})

export class FeaturedPlaylistsComponent implements OnInit { 
  playlists: PlaylistTile[];
  albums: PlaylistTile[];
  isDataLoading: boolean;
  isFolowing: boolean;
  constructor(private featuredPlaylistsService: FeaturedPlaylistsService) {}

  ngOnInit() {
    this.loadFeaturedPlaylists();
  }

  loadFeaturedPlaylists() {
    this.isDataLoading = true;

    this.featuredPlaylistsService.getFeaturedPlaylists()
      .flatMap(data => {
        this.playlists = data;
        this.isDataLoading = false;
        return this.playlists;
      })
      .subscribe(data => {
        const _data = data;
        this.featuredPlaylistsService.isPlaylistFollowingByUser(data.owner['id'], data.id).subscribe(
          (res) => {
            // _data = {..._data, followed: true};
            _data['followed'] = res[0];
          },
          (err) => { console.log(err); }
        );
      });

      this.featuredPlaylistsService.getNewReleasedAlbums()
        .subscribe(data => {
            this.albums = data;
          },
          (err) => { console.log(err); }
        );
  }

  followPlaylist(data) {
    const _self = this;
    const playlist = data;

    this.featuredPlaylistsService.followFeaturedPlaylists(playlist.ownerId, playlist.playlistId).subscribe(
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

    this.featuredPlaylistsService.unfollowFeaturedPlaylists(data.ownerId, data.playlistId).subscribe(
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
