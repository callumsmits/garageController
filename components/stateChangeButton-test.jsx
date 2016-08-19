import React from 'react';
import Chai from 'chai';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateChangeButton from './stateChangeButton.jsx';
import style from '../css/stateChangeButton.css';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateChangeButton />', function () {
  let unsecureAndOpenDoor = new sinon.spy();
  let closeAndSecureDoor = new sinon.spy();
  beforeEach(() => {
    unsecureAndOpenDoor = new sinon.spy();
    closeAndSecureDoor = new sinon.spy();
  });

  it('should render itself and sub-components', function () {
    const props = {
      doorState: 'CLOSED',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').text()).to.equal('Open door');

    const propsOpen = {
      doorState: 'OPEN',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapperOpen = shallow(<StateChangeButton {...propsOpen} />);
    expect(wrapperOpen.find('button').text()).to.equal('Close door');
  });

  it('throws unsecureAndOpenDoor when clicked in closed doorState', function () {
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

  it('disables when not in open or closed doorState', function () {
    const propsOpening = {
      doorState: 'OPENING',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapperOpening = shallow(<StateChangeButton {...propsOpening} />);
    expect(wrapperOpening.find('button').prop('disabled')).to.be.true;
  });

  it('is enabled when in open or closed doorState', function () {
    const props = {
      doorState: 'OPEN',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    expect(wrapper.find('button').prop('disabled')).to.be.false;
  });

  it('has correct css', function () {
    const props = {
      doorState: 'OPEN',
      secureState: 'SECURE',
      unsecureAndOpenDoor,
      closeAndSecureDoor,
    };
    const wrapper = shallow(<StateChangeButton {...props} />);
    expect(wrapper.find('button').prop('className')).to.equal(style.btn);
    expect(wrapper.hasClass(style.box)).to.be.true;
  });
});
