const express = require('express'),
      router = express.Router(),
      Mood = require('./models/mood.model.js');

/* GET ALL MOODS */
router.get('/api/moods', function(req, res, next) {
  Mood.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE MOOD BY TRACK ID */
router.get('/api/moods/:trackId', function(req, res, next) {
  Mood
  .find({trackId: req.params.trackId},  function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE MOOD */
router.post('/api/moods', function(req, res, next) {
  Mood.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

// /* UPDATE MOOD */
router.put('/api/moods/:trackId', function(req, res, next) {
  Mood.findByIdAndUpdate(req.params.trackId, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// /* DELETE MOOD */
// router.delete('/:id', function(req, res, next) {
//   Mood.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;