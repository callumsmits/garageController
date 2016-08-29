import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import garageReducer from '../reducers/index.js';
import App from './app.jsx';

const store = createStore(garageReducer);

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<App />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('Header')).to.have.length(1);
    expect(wrapper.find('DemoIndicator')).to.have.length(1);
    expect(wrapper.find('StateDisplay')).to.have.length(1);
    expect(wrapper.find('StateChangeButton')).to.have.length(1);
  });
});
