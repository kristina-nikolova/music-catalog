const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    trackId: String,
    plays: Number,
    mood: String
});

module.exports = mongoose.model('Mood', MoodSchema, 'Mood');