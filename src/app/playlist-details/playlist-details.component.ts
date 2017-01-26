import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Playlist } from './../shared/model/playlist.model';
import { MyPlaylistsService } from './../my-playlists/my-playlists.service';

@Component({
  providers: [MyPlaylistsService],
  templateUrl: './playlist-details.component.html'
})

export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist;
  
  constructor(private route: ActivatedRoute,
              private myPlaylistsService: MyPlaylistsService) {}

  ngOnInit() {
    //TODO: make it work on reload page
    this.route.params
      .switchMap((params: Params) => this.myPlaylistsService.getMyPlaylistById(params['id']))
      .subscribe(
        (data) => {
              this.playlist = data;
              console.log('playlist details: ');
              console.log(this.playlist);
              }, //Bind to view
              (err) => {
                  console.log(err);
              }
      );
  }

}
