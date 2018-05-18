import { Component, OnInit } from '@angular/core';

import { MyTopService } from './my-top.service';
import { MoodService } from '../shared/services/mood.service';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.css'],
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
    this.getMood();
    this.loadMyTopTracks();
  }

  loadMyTopTracks() {

    this._moodService.getMoods().subscribe((data) => {
      console.log(data);

      if(data) {
        this.isDataLoading = true;
        this._moods = data;
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

  getMood() {
    let moodsName = [];

    this._moods.forEach(mood => {
      moodsName = mood.mood;
    });

    this.currentMood = this._getHighlyOccuredElement(moodsName);
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
