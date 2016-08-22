import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import Header from './header.jsx';
import style from '../css/header.css';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<Header />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').text()).to.equal('Garage Controller');
  });

  it('should use correct CSS', function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').hasClass(style.header)).to.be.true;
  });
});
