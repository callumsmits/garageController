import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import App from './app.jsx';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<App />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).to.equal('Hello');
  });
});
