import React from 'react';
import Chai from 'chai';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateChangeButton from './stateChangeButton.jsx';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateChangeButton />', function () {
  it('should render itself and sub-components', function () {
    const unsecureAndOpenDoor = new sinon.spy();
    const closeAndSecureDoor = new sinon.spy();
    const props = {
      doorState: 'CLOSED',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').text()).to.equal('Open door');
  });

  it('throws unsecureAndOpenDoor when clicked in closed doorState', function () {
    const unsecureAndOpenDoor = new sinon.spy();
    const closeAndSecureDoor = new sinon.spy();
    const props = {
      doorState: 'CLOSED',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    wrapper.find('button').simulate('click');
    expect(unsecureAndOpenDoor.calledOnce).to.be.true;
  });

  it('throws closeAndSecureDoor when clicked in open doorState', function () {
    const unsecureAndOpenDoor = new sinon.spy();
    const closeAndSecureDoor = new sinon.spy();
    const props = {
      doorState: 'OPEN',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    wrapper.find('button').simulate('click');
    expect(closeAndSecureDoor.calledOnce).to.be.true;
  });
});
