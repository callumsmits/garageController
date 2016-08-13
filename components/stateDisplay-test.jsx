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

  it('should render states appropriately', function () {
    const wrapper = shallow(<StateDisplay doorState="OPEN" secureState="SECURE" />);
    expect(wrapper.find('h2').text()).to.equal('Open');
    const wrapperOpening = shallow(<StateDisplay doorState="OPENING" secureState="SECURE" />);
    expect(wrapperOpening.find('h2').text()).to.equal('Opening');
    const wrapperClosing = shallow(<StateDisplay doorState="CLOSING" secureState="SECURE" />);
    expect(wrapperClosing.find('h2').text()).to.equal('Closing');
    const wrapperUnknown = shallow(<StateDisplay doorState="UNKNOWN" secureState="SECURE" />);
    expect(wrapperUnknown.find('h2').text()).to.equal('Unknown');
  });
});
