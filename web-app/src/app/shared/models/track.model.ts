export class Track {
  id: string;
  name: string;
  album: Object;
  artists: Array<Object>;
  uri: string;
  duration_ms: number;

  constructor(track: any) {
    this.id = track.id;
    this.name = track.name;
    this.album = track.album;
    this.artists = track.artists;
    this.uri = this.uri;
    this.duration_ms = this.duration_ms;
  }
}
