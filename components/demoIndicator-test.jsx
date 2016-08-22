import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import DemoIndicator from './demoIndicator.jsx';
import style from '../css/demo.css';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<DemoIndicator />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<DemoIndicator demo />);
    expect(wrapper.find('h2').text()).to.equal('Demo mode');
  });

  it('should contain no text when not in demo state', function () {
    const wrapper = shallow(<DemoIndicator />);
    expect(wrapper.find('h2').text()).to.equal('');
  });

  it('should use correct CSS', function () {
    const wrapper = shallow(<DemoIndicator />);
    expect(wrapper.find('h2').hasClass(style.base)).to.be.true;
    const wrapperFade = shallow(<DemoIndicator />);
    expect(wrapperFade.find('h2').hasClass(style.fade)).to.be.true;
    const wrapperDemoMode = shallow(<DemoIndicator demo />);
    expect(wrapperDemoMode.find('h2').hasClass(style.fadein)).to.be.true;
  });
});
