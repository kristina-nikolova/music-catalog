const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    _id: String,
    trackId: String,
    plays: Number,
    mood: String
});

module.exports = mongoose.model('Mood', MoodSchema, 'Mood');