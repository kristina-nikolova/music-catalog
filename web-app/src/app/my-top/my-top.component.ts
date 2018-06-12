import { Component, OnInit } from '@angular/core';

import { MyTopService } from './my-top.service';
import { MoodService } from '@shared/services';
import { TrackMood } from '@shared/models';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.scss'],
  providers: [MyTopService]
})
export class MyTopComponent implements OnInit {
  isDataLoading: boolean;
  currentMood: string;
  playedTracksAndTracksWithMood: Array<TrackMood>;
  topTracks = [];

  private _moods;

  constructor(private _myTopService: MyTopService, private _moodService: MoodService) {}

  ngOnInit() {
    this._loadMyTopTracks();
  }

  private _loadMyTopTracks() {
    this.isDataLoading = true;

    this._moodService.getAllTracksWithsMood().subscribe((tracks) => {
      if (!tracks.length) {
        this.isDataLoading = false;
      } else {
        this.playedTracksAndTracksWithMood = tracks;
        this._getCurrentMood(tracks);

        tracks.forEach((mood, index) => {
          this._myTopService.getTrackById(mood.trackId).subscribe(
            (track) => {
              this.topTracks.push(track);
              if (index === tracks.length - 1) {
                this.isDataLoading = false;
              }
            },
            (err) => {
              console.log(err);
            }
          );
        });
      }
    });
  }

  private _getCurrentMood(trackMoods) {
    let moodsNames = [];

    const mostPlayed = trackMoods.reduce(function(prevTrack, currentTrack) {
      return prevTrack.plays > currentTrack.plays ? prevTrack : currentTrack;
    });

    this.currentMood = mostPlayed.mood;

    trackMoods.forEach((track, i) => {
      if (trackMoods[i].plays === mostPlayed.plays) {
        moodsNames.push(track.mood);
      }
    });

    if (moodsNames) {
      this.currentMood = this._getHighlyOccuredElement(moodsNames);
    }
  }

  private _getHighlyOccuredElement(array) {
    if (array.length === 0) {
      return null;
    }
    const modeMap = {};
    let maxEl = array[0],
      maxCount = 1;
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (modeMap[el] == null) {
        modeMap[el] = 1;
      } else {
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
