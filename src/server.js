const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path');
      cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(express.static(path.join(__dirname, 'app')));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));

// app.use(errorHandler) 
// function errorHandler (err, req, res, next) {
//   res.status(500);
//   res.render('error', { error: err });
// }

app.route('/api/moods').get((req, res) => {
  res.send({
    moods: [{ plays: 1 }, { mood: 'happy' }]
  });
});

app.route('/api/moods/:trackId').post((req, res) => {
  res.send(201, req.body);
});

// app.route('/api/cats/:name').get((req, res) => {
//   const requestedCatName = req.params['name'];
//   res.send({ name: requestedCatName });
// });

// app.route('/api/moods/:trackId').put((req, res) => {
//   res.send(200, req.body);
// });

// app.route('/api/cats/:name').delete((req, res) => {
//   res.sendStatus(204);
// });

app.listen(port, () => {
  console.log('Server started!');
});