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

At the backend the app is implemented with *Node.js*, *Express* and *Mongoose/MongoDB*. The server source can be found in `server.js`. A demo can be found at the link below. At the frontend the home page has *React/Redux* web forms to create and visit short URLs. React/Redux source can be found at `views/src/`, and it was built with *Parcel*. Source maps were generated and the original source can be viewed in browser developer tools.

* https://akoz002-nodejs-urlshortener.herokuapp.com/

As explained above you can also create short URLs with:

`POST https://akoz002-nodejs-urlshortener.herokuapp.com/api/shorturl/new`

and visit short URLs with:

`GET https://akoz002-nodejs-urlshortener.herokuapp.com/api/shorturl/[short_url]`

#### Tests

A set of basic tests can be found at `tests/tests.js`. To execute the tests in a local environment, first start the server with `npm start`. Environment variable `DB_URI` is used by the app to locate the MongoDB database server. This defaults to a local database server at `mongodb://localhost/url-shortener`.

Then to execute the tests run `npm test`. Environment variable `APP_URL` is used by the tests to locate the app server. This defaults to a local server at `http://localhost:3000/api/shorturl/`. You can also define a local `.env` file with these parameters, and it will be read by the app.
