import React from 'react';
import Chai from 'chai';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateChangeButton from './stateChangeButton.jsx';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateChangeButton />', function () {
  it('should render itself and sub-components', function () {
    // const spy = sinon.spy();
    const props = {
      doorState: 'CLOSED',
      secureState: 'SECURE',
      onStateButtonClick: new sinon.spy(),
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').text()).to.equal('Open door');
  });

  it('throws onStateButtonClick when clicked', function () {
    const onStateButtonClick = new sinon.spy();
    const props = {
      doorState: 'CLOSED',
      secureState: 'SECURE',
      onStateButtonClick,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    wrapper.find('button').simulate('click');
    expect(onStateButtonClick.calledOnce).to.be.true;
  });
});
