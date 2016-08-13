import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import Header from './header.jsx';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<Header />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').text()).to.equal('Garage Controller');
  });
});
