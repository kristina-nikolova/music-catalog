import { Document } from "mongoose";

export interface ITrackMood {
  trackId: String;
  plays: Number;
  mood: String;
  date: String;
}
