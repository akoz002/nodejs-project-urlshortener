
/*
 * Async action creator for creating a new short URL.
 */

export const REQ_CREATE_URL = 'REQUESTED_CREATE_URL';
export const REC_CREATE_URL = 'RECEIVED_CREATE_URL';

const reqCreateUrl = () => ({
  type: REQ_CREATE_URL
});

const recCreateUrl = urlInfo => ({
  type: REC_CREATE_URL,
  urlInfo
});

export const createUrlAsync = url => dispatch => {
  // dispatch request action
  dispatch(reqCreateUrl());

  // send request to create the short URL
  const params = new URLSearchParams();
  params.append('url', url);

  fetch("api/shorturl/new", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  .then(res => res.json())
  .then(json => dispatch(recCreateUrl(json))) // dispatch received action
  .catch(err => console.error(err));
};

/*
 * Action creator for visiting a short URL.
 */

export const SET_SHORT_URL = 'SET_SHORT_URL';

export const setShortUrl = shortUrl => ({
  type: SET_SHORT_URL,
  shortUrl
});
