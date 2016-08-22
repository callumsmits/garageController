import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateDisplay from './stateDisplay.jsx';
import faStyles from 'font-awesome/css/font-awesome.css';
import componentStyles from '../css/stateDisplay.css';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateDisplay />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<StateDisplay doorState="CLOSED" secureState="SECURE" />);
    expect(wrapper.find('span').text()).to.equal('Closed');
    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('div')).to.have.length(2);
  });

  it('should render door states appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="SECURE" />);
    expect(wrapper.find('span').text()).to.equal('Open');
    const wrapperOpening = shallow(<StateDisplay doorState="OPENING" secureState="SECURE" />);
    expect(wrapperOpening.find('span').text()).to.equal('Opening');
    const wrapperClosing = shallow(<StateDisplay doorState="CLOSING" secureState="SECURE" />);
    expect(wrapperClosing.find('span').text()).to.equal('Closing');
    const wrapperUnknown = shallow(<StateDisplay doorState="UNKNOWN" secureState="SECURE" />);
    expect(wrapperUnknown.find('span').text()).to.equal('Unknown');
  });

  it('should render secure state text and icons appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="OFF" />);
    expect(wrapper.find('FontAwesome').prop('name')).to.equal('lock');
    expect(wrapper.find('FontAwesome').props()).to.include.keys('fixedWidth');
    expect(wrapper.find('FontAwesome').prop('size')).to.equal('2x');
    expect(wrapper.find('FontAwesome').prop('cssModule')).to.deep.equal(faStyles);

    const wrapperOn = shallow(<StateDisplay doorState="OPEN" secureState="ON" />);
    expect(wrapperOn.find('FontAwesome').prop('name')).to.equal('unlock');

    const wrapperTurnOn = shallow(<StateDisplay doorState="OPEN" secureState="TURN_ON_REQUEST" />);
    expect(wrapperTurnOn.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOn.find('FontAwesome').prop('spin')).to.equal(true);

    const wrapperTurnOnComplete = shallow(
      <StateDisplay doorState="OPEN" secureState={{ state: 'TURNING_ON', id: 143 }} />);
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOnComplete.find('FontAwesome').prop('spin')).to.equal(true);

    const wrapperTurnOff = shallow(
      <StateDisplay doorState="OPEN" secureState="TURN_OFF_REQUEST" />);
    expect(wrapperTurnOff.find('FontAwesome').prop('name')).to.equal('circle-o-notch');
    expect(wrapperTurnOff.find('FontAwesome').prop('spin')).to.equal(true);
  });

  it('should choose css classes appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="OFF" />);
    expect(wrapper.hasClass(componentStyles.secure)).to.equal(true);
    expect(wrapper.hasClass(componentStyles.box)).to.equal(true);
    expect(wrapper.find('div').at(1).hasClass(componentStyles.innerbox)).to.equal(true);
    expect(wrapper.find('FontAwesome').prop('className')).to.equal(componentStyles.icon);
    expect(wrapper.find('span').hasClass(componentStyles.text)).to.equal(true);

    const wrapperOn = shallow(<StateDisplay doorState="OPEN" secureState="ON" />);
    expect(wrapperOn.hasClass(componentStyles.unsecure)).to.equal(true);

    const wrapperTurnOn = shallow(<StateDisplay doorState="OPEN" secureState="TURN_ON_REQUEST" />);
    expect(wrapperTurnOn.hasClass(componentStyles.intermediate)).to.equal(true);

    const wrapperTurnOnComplete = shallow(
      <StateDisplay doorState="OPEN" secureState={{ state: 'TURNING_ON', id: 143 }} />);
    expect(wrapperTurnOnComplete.hasClass(componentStyles.intermediate)).to.equal(true);

    const wrapperTurnOff = shallow(
      <StateDisplay doorState="OPEN" secureState="TURN_OFF_REQUEST" />);
    expect(wrapperTurnOff.hasClass(componentStyles.intermediate)).to.equal(true);
  });
});
