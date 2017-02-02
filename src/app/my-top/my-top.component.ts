import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';

import { MyTopService } from './my-top.service';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.css'],
  providers: [ MyTopService ]
})
export class MyTopComponent implements OnInit {
  topTracksIds: Object[];
  isDataLoading: boolean;
  topTracks = [];

  constructor(private myTopService: MyTopService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.loadMyTopTracks();
  }

  loadMyTopTracks() {
    const _self = this;
    this.topTracksIds = this.localStorageService.keys();
    this.isDataLoading = true;

    this.topTracksIds.forEach(function(id) {
      _self.myTopService.getTrackById(id)
          .subscribe(
              (data) => {
                _self.topTracks.push(data);
                _self.isDataLoading = false;
              },
              (err) => { console.log(err); }
           );
    });
  }

}
