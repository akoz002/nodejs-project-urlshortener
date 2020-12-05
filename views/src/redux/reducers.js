
import { combineReducers } from 'redux';
import {
  REQ_CREATE_URL,
  REC_CREATE_URL,
  SET_SHORT_URL
} from './actions';

/*
 * Reducer for creating short URLs.
 *
 * The state contains an object representing the created short URL info, e.g.
 * { "original_url": "https://www.google.com/", "short_url": 1 }
 */

const createUrlReducer = (state = {
  creating: false,
  info: null
}, action) => {
  switch(action.type) {
    case REQ_CREATE_URL:
      return {
        creating: true,
        info: null
      };
    case REC_CREATE_URL:
      return {
        creating: false,
        info: action.urlInfo
      };
    default:
      return state;
  }
};

/*
 * Reducer for visiting short URLs.
 *
 * The state is the short URL id.
 */

const visitUrlReducer = (state = '', action) => {
  switch(action.type) {
    case SET_SHORT_URL:
      return action.shortUrl;
    default:
      return state;
  }
};

/*
 * Export the combined reducer.
 */

const rootReducer = combineReducers({
  urlInfo: createUrlReducer,
  shortUrl: visitUrlReducer
});

export default rootReducer;
