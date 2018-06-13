const express = require("express"),
  router = express.Router(),
  TrackMood = require("./models/track-mood.model.js");

function _formatDate(date) {
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date
      .getFullYear()
      .toString()
      .substr(-2)
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
  TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId },
    { $set: req.body },
    { new: true },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* UPDATE MOOD */
router.put("/api/plays-count/:trackId", function(req, res, next) {
  TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId },
    { $set: req.body },
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
