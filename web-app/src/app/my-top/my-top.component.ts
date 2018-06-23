import { Component, OnInit } from '@angular/core';

import { SortByPipe } from '@shared/pipes';
import { TracksWithMoodService } from '@shared/services';
import { MyTopService } from './my-top.service';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.scss'],
  providers: [MyTopService, SortByPipe]
})
export class MyTopComponent implements OnInit {
  isDataLoading: boolean;
  currentMood: string;
  topTracks = [];

  constructor(private _myTopService: MyTopService, private _moodService: TracksWithMoodService) {}

  ngOnInit() {
    this._loadMyTopTracks();
  }

  onTrackPlayed(tracks) {
    this._setCurrentMood(tracks);
    // this.topTracks = new SortByPipe().transform(this.topTracks, 'plays');
  }

  private _setCurrentMood(trackMoods) {
    const moodsNames = [];

    const mostPlayed = trackMoods.reduce(function(prevTrack, currentTrack) {
      return prevTrack.plays > currentTrack.plays ? prevTrack : currentTrack;
    });

    // Set the current mood to mood from most player track
    this.currentMood = mostPlayed.mood;

    // If there are tracks played equal number of times
    // get their mood and check which is hight occured
    trackMoods.forEach((track, i) => {
      if (trackMoods[i].plays === mostPlayed.plays) {
        moodsNames.push(track.mood);
      }
    });

    if (moodsNames) {
      this.currentMood = this._getHighlyOccuredElement(moodsNames);
    }
  }

  private _loadMyTopTracks() {
    this.isDataLoading = true;

    // Get all tracks with mood from node server
    this._moodService.getAllTracksWithsMood().subscribe((tracks) => {
      if (!tracks.length) {
        this.isDataLoading = false;
      } else {
        // Update observable to use it in track component
        this._moodService.playedTracksAndTracksWithMood$.next(tracks);
        this._setCurrentMood(tracks);

        // Go throught all tracks with mood from node server,
        // get track information from spotify for every track
        // And construct topTraks
        tracks.forEach((trackMood, index) => {
          this._myTopService.getTrackById(trackMood.trackId).subscribe((track) => {
            // attach plays count to spotify tracks to sort them
            track['plays'] = trackMood.plays;
            this.topTracks.push(track);
            this.topTracks = new SortByPipe().transform(this.topTracks, 'plays');
            // Stop loading when last track is got
            if (index === tracks.length - 1) {
              this.isDataLoading = false;
            }
          });
        });
      }
    });
  }

  // Helper method for getting most occured elemnt from array
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
