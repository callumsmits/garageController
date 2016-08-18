import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateDisplay from './stateDisplay.jsx';
import styles from 'font-awesome/css/font-awesome.css';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateDisplay />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<StateDisplay doorState="CLOSED" secureState="SECURE" />);
    expect(wrapper.find('h2').text()).to.equal('Closed');
    expect(wrapper.find('FontAwesome')).to.have.length(1);
  });

  it('should render door states appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="SECURE" />);
    expect(wrapper.find('h2').text()).to.equal('Open');
    const wrapperOpening = shallow(<StateDisplay doorState="OPENING" secureState="SECURE" />);
    expect(wrapperOpening.find('h2').text()).to.equal('Opening');
    const wrapperClosing = shallow(<StateDisplay doorState="CLOSING" secureState="SECURE" />);
    expect(wrapperClosing.find('h2').text()).to.equal('Closing');
    const wrapperUnknown = shallow(<StateDisplay doorState="UNKNOWN" secureState="SECURE" />);
    expect(wrapperUnknown.find('h2').text()).to.equal('Unknown');
  });

  it('should render secure states appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="OFF" />);
    expect(wrapper.find('FontAwesome').prop('name')).to.equal('lock');
    expect(wrapper.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapper.find('FontAwesome').prop('size')).to.equal('3x');
    expect(wrapper.find('FontAwesome').prop('cssModule')).to.equal(styles);

    const wrapperOn = shallow(<StateDisplay doorState="OPEN" secureState="ON" />);
    expect(wrapperOn.find('FontAwesome').prop('name')).to.equal('unlock');
    expect(wrapperOn.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapperOn.find('FontAwesome').prop('size')).to.equal('3x');
    expect(wrapperOn.find('FontAwesome').prop('cssModule')).to.equal(styles);

    const wrapperTurnOn = shallow(<StateDisplay doorState="OPEN" secureState="TURN_ON_REQUEST" />);
    expect(wrapperTurnOn.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOn.find('FontAwesome').prop('spin')).to.equal(true);
    expect(wrapperTurnOn.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapperTurnOn.find('FontAwesome').prop('size')).to.equal('3x');
    expect(wrapperTurnOn.find('FontAwesome').prop('cssModule')).to.equal(styles);

    const wrapperTurnOnComplete = shallow(
      <StateDisplay doorState="OPEN" secureState={{ state: 'TURNING_ON', id: 143 }} />);
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('spin')).to.equal(true);
    expect(wrapperTurnOnComplete.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('size')).to.equal('3x');
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('cssModule')).to.equal(styles);

    const wrapperTurnOff = shallow(
      <StateDisplay doorState="OPEN" secureState="TURN_OFF_REQUEST" />);
    expect(wrapperTurnOff.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOff.find('FontAwesome').prop('spin')).to.equal(true);
    expect(wrapperTurnOff.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapperTurnOff.find('FontAwesome').prop('size')).to.equal('3x');
    expect(wrapperTurnOff.find('FontAwesome').prop('cssModule')).to.equal(styles);
  });
});
