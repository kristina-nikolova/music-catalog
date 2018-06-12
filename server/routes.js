const express = require("express"),
  router = express.Router(),
  TrackMood = require("./models/track-mood.model.js");

function _formatDate(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

/* GET ALL MOODS */
router.get("/api/tracks-with-mood", function(req, res, next) {
  let _today = new Date();
  TrackMood.find(
    {
      date: _formatDate(_today)
    },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* GET PLAYED MOODS OR TRACKS WITH MOOD */
router.get("/api/played-tracks-with-mood", function(req, res, next) {
  let _today = new Date();
  TrackMood.find(
    {
      date: _formatDate(_today),
      trackId: { $in: req.query.tracksIds.split(",") }
    },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* GET SINGLE MOOD BY TRACK ID */
// router.get("/api/moods/:trackId", function(req, res, next) {
//   TrackMood.find({ trackId: req.params.trackId }, function(err, data) {
//     if (err) return next(err);
//     res.json(data);
//   });
// });

/* SAVE TRACK MOOD */
router.post("/api/tracks-with-mood", function(req, res, next) {
  TrackMood.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE MOOD */
router.put("/api/moods/:trackId", function(req, res, next) {
  const mood = {
    mood: req.body.mood
  };
  TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId },
    { $set: mood },
    { new: true },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* UPDATE MOOD */
router.put("/api/plays-count/:trackId", function(req, res, next) {
  const plays = {
    plays: req.body.plays
  };
  TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId },
    { $set: plays },
    { new: true },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

// /* DELETE MOOD */
// router.delete('/:id', function(req, res, next) {
//   TrackMood.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
