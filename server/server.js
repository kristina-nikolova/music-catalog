const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path");
(cors = require("cors")),
  (mongoose = require("mongoose")),
  (router = require("./routes.js"));

// MongoDB port is 27017 by default.
const db = mongoose.connect(
  "mongodb://localhost:27017/music-catalog",
  function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to " + db, " + ", response);
    }
  }
);

const app = express();
const corsOptions = {
  credentials: true,
  origin: "*",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Origin", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(express.static(path.join(__dirname, "app")));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use(errorHandler);
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

app.use("/", router);

app.listen(3000, () => {
  console.log("Server started!");
});
