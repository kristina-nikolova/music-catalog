const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path');
      cors = require('cors'),
      mongoose = require("mongoose"),
      router = express.Router(),
      Mood = require('./models/mood.model.js');

/*
   * MongoDB port is 27017 by default.
   * Assuming you have created mongoDB database named "data".
*/
const db = mongoose.connect("mongodb://localhost:27017/music-catalog", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }
});

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(express.static(path.join(__dirname, 'app')));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use(errorHandler);
function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

/* GET ALL MOODS */
router.get('/api/moods', function(req, res, next) {
  Mood.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log('Server started!');
});