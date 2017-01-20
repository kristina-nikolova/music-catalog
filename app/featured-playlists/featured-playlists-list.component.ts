import { Component, OnInit } from '@angular/core';

import { FeaturedPlaylistsService } from './featured-playlists.service';
import { Playlist } from './../shared/model/playlist.model';

@Component({
  providers: [FeaturedPlaylistsService],
  template: `
    <h2>Featured Playlists</h2>
    <ul>
      <li *ngFor="let playlist of playlists"
          class="playlist__list-item">
        <playlist [playlistCover]="playlist.images[0].url"
                           [playlistName]="playlist.name" ></playlist>
      </li>
    </ul>
  `,
})

export class FeaturedPlaylistsListComponent implements OnInit {
  playlists: Playlist[];
  
  constructor(private featuredPlaylistsService: FeaturedPlaylistsService) {}

  ngOnInit() {
    this.loadFeaturedPlaylists()
  }

  loadFeaturedPlaylists() {
    this.featuredPlaylistsService.getFeaturedPlaylists()
        .subscribe(
            (data) => {
              this.playlists = data;
              //console.log(this.playlists);
            },
            (err) => {
                console.log(err);
            }
         );
  }
}
