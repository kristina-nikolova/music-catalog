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
  currentMood: string;
  topTracks = [];

  constructor(private myTopService: MyTopService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getMood();
    this.loadMyTopTracks();
  }

  loadMyTopTracks() {
    const _self = this;
    
    this.topTracksIds = this.localStorageService.keys();
    
    if (this.topTracksIds.length) {
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

  getMood() {
    let moods = [];

    for ( let i = 0, len = this.localStorageService.length(); i < len; ++i ) {
      let value = this.localStorageService.get( this.localStorageService.keys()[i] );
      moods.push(value['mood']);
    }

    this.currentMood = this.getHighlyOccuredElement(moods);
  }

  getHighlyOccuredElement(array) {
    if(array.length == 0)
        return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++)
    {
        let el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
  }

}
