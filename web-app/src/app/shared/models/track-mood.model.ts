export class TrackMood {
  trackId: string;
  plays: number;
  mood: string;
  date: string;

  constructor(data: any) {
    this.trackId = data.trackId;
    this.plays = data.plays;
    this.mood = data.mood;
    this.date = data.date;
  }
}
