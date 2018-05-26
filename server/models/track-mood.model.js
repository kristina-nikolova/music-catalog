const mongoose = require('mongoose');

const TrackMoodSchema = new mongoose.Schema({
    trackId: String,
    plays: Number,
    mood: String
});

module.exports = mongoose.model('TrackMood', TrackMoodSchema, 'TrackMood');