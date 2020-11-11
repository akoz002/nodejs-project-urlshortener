/*
 * freeCodeCamp APIs and Microservices Certification
 * Project 3: URL Shortener Microservice
 * Alex Kozlov, 2020
 */

/*
 * The main node.js app script for the URL Shortener Microservice.
 */

'use strict';

/*
 * Initial configuration.
 */

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var dns = require('dns');
var util = require('util');
var checkUrlFormat = require('./utils/checkUrlFormat');
require('dotenv').config();

var dnsLookup = util.promisify(dns.lookup);
var app = express();

/*
 * Compile model for storing URLs.
 */

const Url = mongoose.model('Url', require('./schemas/urlSchema'));

/*
 * Helper to find the new URL ID which is the current max ID plus 1.
 */

const getNewUrlId = () => Url.aggregate([
  { $group: { _id: null, maxId: { $max: '$_id' } } },
  { $project: { _id: 0, maxId: 1 } }
])
.then(function(res) {
  if (res.length > 0) {
    return res[0].maxId + 1;
  }
  return 1;
});

/*
 * Connect to MongoDB.
 */

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`Successfully connected to MongoDB URI: '${process.env.DB_URI}'`);
});

/*
 * Mount middleware.
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(process.cwd() + '/public'));

/*
 * Serve 'index.html' at the root path.
 */

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

/*
 *  Endpoint to create a new short URL.
 */

app.post("/api/shorturl/new", function (req, res) {
  console.log(`Received request to create a new short URL for: '${req.body.url}'`);

  // check the URL format
  const hostname = checkUrlFormat(req.body.url);
  if (!hostname) {
    return res.json({ error: "invalid URL" });
  }

  // validate the hostname
  dnsLookup(hostname)
  .then(async () => {
    console.log("Successfully validated hostname '%s'.", hostname);

    // save the new URL to MongoDB
    const newUrl = new Url({
      _id: await getNewUrlId(),
      url: req.body.url
    });

    newUrl.save(function(error, newUrl) {
      if (error) {
        console.error(error);
        res.json({ error });
      }
      else {
        console.log(
          `Successfully created short URL ID '${newUrl._id}' ` +
          `for URL '${newUrl.url}'`
        );
        res.json({ original_url: newUrl.url, short_url: newUrl._id });
      }
    });
  })
  .catch(() => {
    console.error("Failed to resolve hostname '%s'.", hostname);
    res.json({ error: "invalid URL" });
  });
});

/*
 * Endpoint to visit a short URL.
 */

app.get("/api/shorturl/:urlId(\\d+)", function (req, res) {
  console.log(`Received request to visit short URL ID '${req.params.urlId}'`);

  Url.findById(req.params.urlId, function(error, shortUrl) {
    if (error) {
      console.error(error);
      res.json({ error });
    }
    else if (!shortUrl) {
      const errorMessage = `No URL exists in database for the given URL ID '${req.params.urlId}'`;
      console.error(errorMessage);
      res.json({ error: errorMessage });
    }
    else {
      console.log(`Redirecting to URL '${shortUrl.url}' for the given URL ID '${shortUrl._id}'`);
      res.redirect(shortUrl.url);
    }
  });
});

/*
 * Endpoint to delete all entries from the database.
 */

app.delete("/api/shorturl/delete", function (req, res) {
  Url.deleteMany({}, function(error) {
    if (error) {
      console.error(error);
      res.json({ error });
    }
    else {
      console.log("Successfully deleted all entries from the database.");
      res.end();
    }
  });
});

/*
 * Listen for requests.
 */

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App is listening on port: ' + listener.address().port);
});
