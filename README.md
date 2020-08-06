# API Project: URL Shortener Microservice for freeCodeCamp


### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL with `GET [project_url]/api/shorturl/[short_url]`, it will redirect me to my original link.


#### Creation Example:

`POST [project_url]/api/shorturl/new` - body (urlencoded):  `'url=https://www.google.com/'`

#### Usage:

`GET [project_url]/api/shorturl/1`

#### Will redirect to:

*https://www.google.com/*

### Implementation

The app is implemented with Node.js, Express and Mongoose/MongoDB. A demo can be found at the link below. The link shows a project overview page with a simple web form to create short URLs. 

* https://akoz002-nodejs-urlshortener.herokuapp.com/

As explained above you can also create short URLs with:

`POST https://akoz002-nodejs-urlshortener.herokuapp.com/api/shorturl/new`

and visit short URLs with:

`GET https://akoz002-nodejs-urlshortener.herokuapp.com/api/shorturl/[short_url]`

#### Tests

A set of basic tests can be found at `tests/tests.js`. The tests can be executed by running `npm test` from the root directory.

The `.env` file contains two parameters for configuring the app and the tests. The `APP_URL` is used by the tests to locate the app server. The `DB_URI` is used by the app to locate the MongoDB database server. 

By default the tests will run against the app deployed to the cloud (on Heroku as above), and the app will connect to the cloud database server (on MongoDB Atlas).
