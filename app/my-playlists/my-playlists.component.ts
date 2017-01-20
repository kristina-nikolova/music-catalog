import { Component, OnInit } from '@angular/core';

import { MyPlaylistsService } from './my-playlists.service';
import { Playlist } from './../shared/model/playlist.model';

@Component({
  providers: [MyPlaylistsService],
  template: `
    <h2>My playlists</h2>
    <ul>
      <li *ngFor="let playlist of playlists"
          class="playlist__list-item">
        <playlist [playlistCover]="playlist.images[0].url"
                           [playlistName]="playlist.name" ></playlist>
      </li>
    </ul>
  `
})

export class MyPlaylistsComponent implements OnInit {
  playlists: Playlist[];
  
  constructor(private myPlaylistsService: MyPlaylistsService) {}

  ngOnInit() {
    this.loadMyPlaylists()
  }

  loadMyPlaylists() {
    this.myPlaylistsService.getMyPlaylists()
        .subscribe(
            (data) => {
              this.playlists = data;
              console.log(this.playlists);
            }, //Bind to view
            (err) => {
                console.log(err);
            }
         );
  }
}

