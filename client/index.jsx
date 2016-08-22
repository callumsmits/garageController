import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import garageReducer from '../reducers/index.js';
import App from '../components/app.jsx';
import { startMonitoringDistance } from '../actions';

let store = createStore(garageReducer, undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// store.dispatch(startMonitoringDistance());

const root = document.createElement('div');
document.body.appendChild(root);
render(
  <Provider store={store}>
    <App />
  </Provider>
  , root);
