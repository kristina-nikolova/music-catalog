const express = require("express"),
  router = express.Router(),
  model = require("./models/track-mood.model.js");

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
  model.TrackMood.find(
    {
      date: _formatDate(new Date())
    },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* GET PLAYED MOODS OR TRACKS WITH MOOD */
router.get("/api/played-tracks-with-mood", function(req, res, next) {
  model.TrackMood.find(
    {
      date: _formatDate(new Date()),
      trackId: { $in: req.query.tracksIds.split(",") }
    },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

/* SAVE TRACK MOOD */
router.post("/api/tracks-with-mood", function(req, res, next) {
  model.TrackMood.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE MOOD */
router.put("/api/moods/:trackId", function(req, res, next) {
  model.TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId, date: _formatDate(new Date()) },
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
  model.TrackMood.findOneAndUpdate(
    { trackId: req.params.trackId, date: _formatDate(new Date()) },
    { $set: req.body },
    { new: true },
    function(err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

module.exports = router;
