import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FeaturedPlaylistsService } from './featured-playlists.service';
import { PlaylistTile } from './../shared/model/playlist-tile.model';

@Component({
  providers: [FeaturedPlaylistsService],
  templateUrl: './featured-playlists.component.html'
})

export class FeaturedPlaylistsComponent implements OnInit {
  
  playlists: PlaylistTile[];
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
        let _data = data;
        this.featuredPlaylistsService.isPlaylistFollowingByUser(data.owner['id'], data.id).subscribe(
          (res) => {
            //_data = {..._data, followed: true};
            _data["followed"] = res[0];
          },
          (err) => { console.log(err); }
        );
      });
  }

  followPlaylist(data) {
    var _self = this;

    this.featuredPlaylistsService.followFeaturedPlaylists(data.ownerId, data.playlistId).subscribe(
      (data) => {
        _self.isFolowing = true;
        setTimeout(function(){ _self.isFolowing = false; }, 1000);
      },
      (err) => { console.log(err); }
    );
  }

  unfollowPlaylist(data) {
    var _self = this;

    this.featuredPlaylistsService.unfollowFeaturedPlaylists(data.ownerId, data.playlistId).subscribe(
      (data) => { 
        _self.isFolowing = true;
        setTimeout(function(){ _self.isFolowing = false; }, 1000);
      },
      (err) => { console.log(err); }
    );
  }
}
