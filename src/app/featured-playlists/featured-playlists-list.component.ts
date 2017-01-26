import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FeaturedPlaylistsService } from './featured-playlists.service';
import { Playlist } from './../shared/model/playlist.model';

@Component({
  providers: [FeaturedPlaylistsService],
  templateUrl: './featured-playlists-list.component.html'
})

export class FeaturedPlaylistsListComponent implements OnInit {
  
  playlists: Playlist[];
  
  constructor(private featuredPlaylistsService: FeaturedPlaylistsService) {}

  ngOnInit() {
    this.loadFeaturedPlaylists();
  }

  loadFeaturedPlaylists() {
    this.featuredPlaylistsService.getFeaturedPlaylists()
        .subscribe(
            (data) => {
              this.playlists = data;
              console.log(this.playlists);
            },
            (err) => {
                console.log(err);
            }
         );
  }

  followPlaylist(data) {
    this.featuredPlaylistsService.followFeaturedPlaylists(data.ownerId, data.playlistId).subscribe();
  }

  unfollowPlaylist(data) {
    this.featuredPlaylistsService.unfollowFeaturedPlaylists(data.ownerId, data.playlistId).subscribe();
  }

  // isPlaylistFollowingByUser(ownerId, playlistId) {
  //   this.featuredPlaylistsService.isPlaylistFollowingByUser(ownerId, playlistId)
  //       .subscribe(
  //           (data) => {
  //             console.log(data);
  //           },
  //           (err) => {
  //               console.log(err);
  //           }
  //        );
  // }
}
