import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

describe('garage secure reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should respond to UNSECURE_DOOR action in OFF state', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'UNSECURE_DOOR',
    })).to.deep.equal({
      secure: 'TURNING_ON',
      door: 'CLOSED',
    });
  });
  it('should not respond to UNSECURE_DOOR action in other states', function () {
    expect(garageReducer({
      secure: 'TURNING_ON',
      door: 'CLOSED',
    }, {
      type: 'UNSECURE_DOOR',
    })).to.deep.equal({
      secure: 'TURNING_ON',
      door: 'CLOSED',
    });
    expect(garageReducer({
      secure: 'ON',
      door: 'CLOSED',
    }, {
      type: 'UNSECURE_DOOR',
    })).to.deep.equal({
      secure: 'ON',
      door: 'CLOSED',
    });
  });
  it('should respond to TURN_ON_TIMEOUT action in TURNING_ON state', function () {
    expect(garageReducer({
      secure: 'TURNING_ON',
      door: 'CLOSED',
    }, {
      type: 'TURN_ON_TIMEOUT',
    })).to.deep.equal({
      secure: 'ON',
      door: 'CLOSED',
    });
  });
  it('should not respond to TURN_ON_TIMEOUT action in other states', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'TURN_ON_TIMEOUT',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
    expect(garageReducer({
      secure: 'ON',
      door: 'CLOSED',
    }, {
      type: 'TURN_ON_TIMEOUT',
    })).to.deep.equal({
      secure: 'ON',
      door: 'CLOSED',
    });
  });
  it('should respond to SECURE_DOOR action', function () {
    expect(garageReducer({
      secure: 'ON',
      door: 'CLOSED',
    }, {
      type: 'SECURE_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
});
