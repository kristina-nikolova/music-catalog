import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Playlist } from './../shared/model/playlist.model';
import { MyPlaylistsService } from './../my-playlists/my-playlists.service';

@Component({
  providers: [MyPlaylistsService],
  template: `
    <h2>Playlist Details</h2>
    <div *ngIf="isDataAvailable">
        <img [src]="playlist.images[0].url" alt="playlist cover" />
        <div>name: {{playlist.name}}</div>
        <div *ngFor="let track of playlist.tracks.items">
          {{track.track.name}}
        </div>
    </div>
  `,
})

export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist;
  //TODO: smart way to do this?
  isDataAvailable:boolean = false;
  
  constructor(private route: ActivatedRoute,
              private myPlaylistsService: MyPlaylistsService) {}

  ngOnInit() {
    //TODO: make it work on reload page
    this.route.params
      .switchMap((params: Params) => this.myPlaylistsService.getMyPlaylistById(params['id']))
      .subscribe(
        (data) => {
              this.playlist = data;
              this.isDataAvailable = true;
              console.log('playlist details: ');
              console.log(this.playlist);
              }, //Bind to view
              (err) => {
                  console.log(err);
              }
      );
  }

}
