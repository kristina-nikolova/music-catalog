import { ITrackMood } from '../../../../../shared/interfaces/track-mood.interface';

export class TrackMood {
  trackId: string;
  plays: number;
  mood: string;
  date: string;

  constructor(data: ITrackMood) {
    this.trackId = data.trackId;
    this.plays = data.plays;
    this.mood = data.mood;
    this.date = data.date;
  }
}
