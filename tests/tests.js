/*
 * Basic tests for the URL Shortener Microservice.
 * Alex Kozlov, 2020
 */

const assert = require('assert');
const axios = require('axios');
const queryString = require('querystring');
require('dotenv').config();

/*
 * Validate creating a short URL.
 */

const validateCreateURL = (url, expectedUrlId) => axios.post(
  process.env.APP_URL + 'new',
  queryString.stringify({ url })
)
.then(res => {
  assert.strictEqual(res.data.original_url, url);
  assert.strictEqual(res.data.short_url, expectedUrlId);

  console.log("Successfully validated creating a new URL '%s' with ID '%s'.",
    res.data.original_url, res.data.short_url);
});

/*
 * Attempt to create an invalid short URL.
 */

const createInvalidURL = url => axios.post(
  process.env.APP_URL + 'new',
  queryString.stringify({ url })
)
.then(res => {
  assert.strictEqual(res.data.error, 'invalid URL');

  console.log("Successfully validated trying to create invalid URL '%s'.", url);
});

/*
 * Validate visiting a short URL.
 */

const validateVisitURL = (urlId, expectedUrl) => axios.get(
  process.env.APP_URL + urlId
)
.then(res => {
  assert.strictEqual(res.request.res.responseUrl, expectedUrl);

  console.log("Successfully validated visiting URL '%s' with ID '%s'.",
    res.request.res.responseUrl, urlId);
});

/*
 * Attempt to visit an invalid URL.
 */

const visitInvalidURL = urlId => axios.get(
  process.env.APP_URL + urlId
)
.then(res => {
  assert.strictEqual(res.data.error,
    `No URL exists in database for the given URL ID '${urlId}'`);
});

/*
 * Validate deleting all entries from the database.
 */

const validateClearDatabase = () => axios.delete(
  process.env.APP_URL + 'delete'
)
.then(async res => {
  assert.ok(!res.data); // no data on success

  // check that the database is empty
  await visitInvalidURL(1);
  await visitInvalidURL(2);
  await visitInvalidURL(3);

  console.log('Successfully validated clearing the database.');
});

/*
 * Run basic tests.
 */

const testURLs = [
  {
    url: 'https://www.freecodecamp.org/',
    expectedUrl: 'https://www.freecodecamp.org/'
  },
  {
    url: 'https://www.freecodecamp.org',
    expectedUrl: 'https://www.freecodecamp.org/'
  },
  {
    url: 'https://freecodecamp.org',
    expectedUrl: 'https://www.freecodecamp.org/'
  },
  {
    url: 'http://freecodecamp.org',
    expectedUrl: 'https://www.freecodecamp.org/'
  },
  {
    url: 'https://www.freecodecamp.org/forum/',
    expectedUrl: 'https://forum.freecodecamp.org/'
  },
  {
    url: 'https://www.freecodecamp.org/forum',
    expectedUrl: 'https://forum.freecodecamp.org/'
  }
];

const invalidURLs = [
  '',
  'asdf',
  'https://asdf',
  'https://asdf/asdf/asdf',
  'https://asdf-asdf/'
];

async function runTests() {
  console.log(`Running tests on app URL: '${process.env.APP_URL}'\n`);

  // clear the database before running tests
  await validateClearDatabase();
  console.log();

  // create valid URLs and visit them
  for (const i in testURLs) {
    const url = testURLs[i].url;
    const expectedUrl = testURLs[i].expectedUrl;
    const expectedUrlId = Number(i) + 1;

    await validateCreateURL(url, expectedUrlId);
    await validateVisitURL(expectedUrlId, expectedUrl);
  }
  console.log();

  // attempt to create invalid URLs
  for (const i in invalidURLs) {
    const url = invalidURLs[i];

    await createInvalidURL(url);
  }
  console.log();

  // clear the database after running tests
  await validateClearDatabase();
}

runTests();
