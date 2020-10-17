'use strict';
/*
 * Redux action creators, reducers and the store.
 */

/*
 * Async action creator for creating a new short URL.
 */

const REQ_CREATE_URL = 'REQUESTED_CREATE_URL';
const REC_CREATE_URL = 'RECEIVED_CREATE_URL';

const reqCreateUrl = () => ({
  type: REQ_CREATE_URL
});

const recCreateUrl = urlInfo => ({
  type: REC_CREATE_URL,
  urlInfo
});

const createUrlAsync = url => dispatch => {
  // dispatch request action
  dispatch(reqCreateUrl()); // send request to create the short URL

  const params = new URLSearchParams();
  params.append('url', url);
  fetch("api/shorturl/new", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  }).then(res => res.json()).then(json => dispatch(recCreateUrl(json))) // dispatch received action
  .catch(err => console.error(err));
};
/*
 * Reducer for creating short URLs.
 *
 * The state is an object representing the created short URL info, e.g.
 * { "original_url": "https://www.google.com/", "short_url": 1 }
 */


const createUrlReducer = (state = null, action) => {
  switch (action.type) {
    case REQ_CREATE_URL:
      // at the moment this has no effect on state
      return state;

    case REC_CREATE_URL:
      return action.urlInfo;

    default:
      return state;
  }
};
/*
 * Action creator for visiting a short URL.
 */


const SET_SHORT_URL = 'SET_SHORT_URL';

const setShortUrl = shortUrl => ({
  type: SET_SHORT_URL,
  shortUrl
});
/*
 * Reducer for visiting short URLs.
 *
 * The state is the short URL id.
 */


const visitUrlReducer = (state = '', action) => {
  switch (action.type) {
    case SET_SHORT_URL:
      return action.shortUrl;

    default:
      return state;
  }
};
/*
 * Create the combined reducer and the store.
 */


const rootReducer = Redux.combineReducers({
  urlInfo: createUrlReducer,
  shortUrl: visitUrlReducer
});
const store = Redux.createStore(rootReducer, Redux.applyMiddleware(ReduxThunk.default));
store.subscribe(() => console.log(store.getState()));
/*
 * Export action creators and the store.
 */

export { createUrlAsync, setShortUrl, store };