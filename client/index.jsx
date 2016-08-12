import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import garageReducer from '../reducers/index.js';

let store = createStore(garageReducer);

const root = document.createElement('div');
document.body.appendChild(root);
render(
  <Provider store={store}>
    <h1>Hello</h1>
  </Provider>
  , root);
