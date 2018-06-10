const express = require('express'),
      router = express.Router(),
      TrackMood = require('./models/track-mood.model.js');

/* GET ALL MOODS */
router.get('/api/moods', function(req, res, next) {
  TrackMood.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET PLAYED MOODS OR TRACKS WITH MOOD */
router.get('/api/played-tracks-with-mood', function(req, res, next) {
  TrackMood.find({
    'trackId': { "$in": req.query.tracksIds.split(',') }
}, function(err, data){
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE MOOD BY TRACK ID */
router.get('/api/moods/:trackId', function(req, res, next) {
  TrackMood
  .find({trackId: req.params.trackId},  function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE MOOD */
router.post('/api/moods', function(req, res, next) {
  TrackMood.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

// /* UPDATE MOOD */
router.put('/api/moods/:trackId', function(req, res, next) {
  TrackMood.findOneAndUpdate({ trackId: req.params.trackId }, req.body, {new: true}, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

// /* DELETE MOOD */
// router.delete('/:id', function(req, res, next) {
//   TrackMood.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;