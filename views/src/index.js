
'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import CreateUrlForm from './components/CreateUrlForm';
import VisitUrlForm from './components/VisitUrlForm';

/*
 * Create the redux store and render the components.
 */

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

render(
  <Provider store={store}>
    <CreateUrlForm />
  </Provider>,
  document.querySelector('#create-url-form')
);

render(
  <Provider store={store}>
    <VisitUrlForm />
  </Provider>,
  document.querySelector('#visit-url-form')
);
