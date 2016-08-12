import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import garageReducer from '../reducers'

let store = createStore(garageReducer);

const Content = React.createClass({
  render: function() {
    return (
	  <Provider store={store}>
	  	<h1>Hello</h1>
	  </Provider>
    );
  },
});
const root = document.createElement('div');
document.body.appendChild(root);
render(<Content />, root);
