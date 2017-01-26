import { Component, OnInit } from '@angular/core';

import { MyPlaylistsService } from './my-playlists.service';
import { Playlist } from './../shared/model/playlist.model';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './my-playlists-list.component.html'
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
            (data) => { this.playlists = data; },
            (err) => { console.log(err); }
         );
  }
}

