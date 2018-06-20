import { Document, Schema, model } from "mongoose";
import { ITrackMood } from "./../../shared/interfaces/track-mood.interface";

const TrackMoodSchema = new Schema({
  trackId: String,
  plays: Number,
  mood: String,
  date: String
});

type TrackMoodType = ITrackMood & Document;

export const TrackMood = model<TrackMoodType>(
  "TrackMood",
  TrackMoodSchema,
  "TrackMood"
);
