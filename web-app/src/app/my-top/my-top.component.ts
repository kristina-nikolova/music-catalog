import { Component, OnInit } from '@angular/core';

import { MyTopService } from './my-top.service';
import { MoodService } from '@shared/services';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.scss'],
  providers: [ MyTopService ]
})
export class MyTopComponent implements OnInit {
  isDataLoading: boolean;
  currentMood: string;
  topTracks = [];

  private _moods;

  constructor(private _myTopService: MyTopService,
              private _moodService: MoodService
            ) { }

  ngOnInit() {
    this._loadMyTopTracks();
  }

  private _loadMyTopTracks() {

    this._moodService.getMoods().subscribe((data) => {
      if(data) {
        this.isDataLoading = true;
        this._getCurrentMood(data);
        data.forEach(mood => {
          this._myTopService.getTrackById(mood.trackId)
            .subscribe(
                (data) => {
                  this.topTracks.push(data);
                  this.isDataLoading = false;
                },
                (err) => { console.log(err); }
            );
        });
      }
    });
  }

  private _getCurrentMood(moods) {

    let moodsNames = [];

    const mostPlayed = moods.reduce(function(prev, current) {
        return (prev.plays > current.plays) ? prev : current
    });

    this.currentMood = mostPlayed.mood;

    moods.forEach((mood, i) => {
      if(moods[i].plays === mostPlayed.plays) {
        moodsNames.push(mood.mood);
      } 
    });

    if(moodsNames) {
      this.currentMood = this._getHighlyOccuredElement(moodsNames);
    }
  }

  private _getHighlyOccuredElement(array) {
    if (array.length === 0) { return null; }
    const modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (modeMap[el] == null) {
          modeMap[el] = 1;
        }  else {
          modeMap[el]++;
        }
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
  }

}
