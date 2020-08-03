
/*
 * Helper to check the format of the URL.
 */

function checkUrlFormat(url) {
  const match = url.match(/https?:\/\/([\w\-\.~]+)(\/|$)/);

  if (!match) {
    console.error("Input URL '%s' is invalid.", url);
    return null;
  }

  const hostname = match[1];
  console.log("Successfully extracted hostname '%s' from input URL '%s'.",
    hostname, url);
  return hostname;
}

module.exports = checkUrlFormat;
