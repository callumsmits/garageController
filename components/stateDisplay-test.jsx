import React from 'react';
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

import StateDisplay from './stateDisplay.jsx';

const expect = Chai.expect;
Chai.use(sinonChai);

describe('<StateDisplay />', function () {
  it('should render itself and sub-components', function () {
    const wrapper = shallow(<StateDisplay doorState="CLOSED" secureState="SECURE" />);
    expect(wrapper.find('h2').text()).to.equal('Closed');
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
    expect(wrapper.find('h3').text()).to.equal('Secure');
    const wrapperOn = shallow(<StateDisplay doorState="OPEN" secureState="ON" />);
    expect(wrapperOn.find('h3').text()).to.equal('Unlocked');
    const wrapperTurnOn = shallow(<StateDisplay doorState="OPEN" secureState="TURN_ON_REQUEST" />);
    expect(wrapperTurnOn.find('h3').text()).to.equal('Unlocking');
    const wrapperTurnOnComplete = shallow(<StateDisplay doorState="OPEN" secureState={{ state: 'TURNING_ON', id: 143 }} />);
    expect(wrapperTurnOnComplete.find('h3').text()).to.equal('Unlocking');
    const wrapperTurnOff = shallow(<StateDisplay doorState="OPEN" secureState="TURN_OFF_REQUEST" />);
    expect(wrapperTurnOff.find('h3').text()).to.equal('Locking');
  });
});
