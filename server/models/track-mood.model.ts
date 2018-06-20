// const mongoose = require("mongoose");
import { Document, Schema, model } from "mongoose";
import { ITrackMood } from "./track-mood.interface";

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

// module.exports = mongoose.model("TrackMood", TrackMoodSchema, "TrackMood");
