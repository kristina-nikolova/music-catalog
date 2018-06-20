"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var TrackMoodSchema = new mongoose_1.Schema({
    trackId: String,
    plays: Number,
    mood: String,
    date: String
});
exports.TrackMood = mongoose_1.model("TrackMood", TrackMoodSchema, "TrackMood");
