import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const reducerTestBaseConfig = { door: { position: 'CLOSED' }, distanceRequest: 'NONE', demo: false };

function generateTestState(secure) {
  return Object.assign({}, reducerTestBaseConfig, secure);
}

const error = new TypeError('not a number');
describe('garage secure reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
  });
  it('should respond to TURN_ON_REQUEST action in OFF state', function () {
    expect(garageReducer(generateTestState({
      secure: 'OFF',
    }), {
      type: 'TURN_ON_REQUEST',
    })).to.deep.equal(generateTestState({
      secure: 'TURN_ON_REQUEST',
    }));
  });
  it('should not respond to TURN_ON_REQUEST action in other states', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURNING_ON',
    }), {
      type: 'TURN_ON_REQUEST',
    })).to.deep.equal(generateTestState({
      secure: 'TURNING_ON',
    }));
    expect(garageReducer(generateTestState({
      secure: 'ON',
    }), {
      type: 'TURN_ON_REQUEST',
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
  });
  it('should respond to TURN_ON_REQUEST_COMPLETE action in TURN_ON_REQUEST state', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURN_ON_REQUEST',
    }), {
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: {
        secure: 0,
        id: 143,
      },
    })).to.deep.equal(generateTestState({
      secure: {
        state: 'TURNING_ON',
        id: 143,
      },
    }));
  });
  it('should check payload of TURN_ON_REQUEST_COMPLETE action', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURN_ON_REQUEST',
    }), {
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: {
        secure: 1,
        id: 143,
      },
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
    expect(garageReducer(generateTestState({
      secure: 'TURN_ON_REQUEST',
    }), {
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: error,
      error: true,
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
  });
  it('should not respond to TURN_ON_REQUEST_COMPLETE in other states', function () {
    expect(garageReducer(generateTestState({
      secure: 'OFF',
    }), {
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: {
        secure: 0,
        id: 143,
      },
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
  });
  it('should respond to TURN_ON_TIMEOUT action in TURNING_ON state', function () {
    expect(garageReducer(generateTestState({
      secure: {
        state: 'TURNING_ON',
        id: 143,
      },
    }), {
      type: 'TURN_ON_TIMEOUT',
      payload: 143,
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
  });
  it('should check that state id matches id in TURN_ON_TIMEOUT action', function () {
    expect(garageReducer(generateTestState({
      secure: {
        state: 'TURNING_ON',
        id: 143,
      },
    }), {
      type: 'TURN_ON_TIMEOUT',
      payload: 145,
    })).to.deep.equal(generateTestState({
      secure: {
        state: 'TURNING_ON',
        id: 143,
      },
    }));
  });
  it('should not respond to TURN_ON_TIMEOUT action in other states', function () {
    expect(garageReducer(generateTestState({
      secure: 'OFF',
    }), {
      type: 'TURN_ON_TIMEOUT',
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
    expect(garageReducer(generateTestState({
      secure: 'ON',
    }), {
      type: 'TURN_ON_TIMEOUT',
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
  });
  it('should respond to TURN_OFF_REQUEST action in ON state', function () {
    expect(garageReducer(generateTestState({
      secure: 'ON',
    }), {
      type: 'TURN_OFF_REQUEST',
    })).to.deep.equal(generateTestState({
      secure: 'TURN_OFF_REQUEST',
    }));
  });
  it('should not respond to TURN_OFF_REQUEST action in other states', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURNING_ON',
    }), {
      type: 'TURN_OFF_REQUEST',
    })).to.deep.equal(generateTestState({
      secure: 'TURNING_ON',
    }));
  });
  it('should respond to TURN_OFF_REQUEST_COMPLETE action in TURN_OFF_REQUEST state', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURN_OFF_REQUEST',
    }), {
      type: 'TURN_OFF_REQUEST_COMPLETE',
      payload: {
        secure: 1,
      },
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
  });
  it('should check TURN_OFF_REQUEST_COMPLETE payload and handle error', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURN_OFF_REQUEST',
    }), {
      type: 'TURN_OFF_REQUEST_COMPLETE',
      payload: {
        secure: 0,
      },
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
    expect(garageReducer(generateTestState({
      secure: 'TURN_OFF_REQUEST',
    }), {
      type: 'TURN_OFF_REQUEST_COMPLETE',
      payload: error,
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
  });
  it('should not respond to TURN_OFF_REQUEST_COMPLETE action in other states', function () {
    expect(garageReducer(generateTestState({
      secure: 'TURNING_ON',
    }), {
      type: 'TURN_OFF_REQUEST_COMPLETE',
      payload: {
        secure: 0,
      },
    })).to.deep.equal(generateTestState({
      secure: 'TURNING_ON',
    }));
  });
  it('should set state after INITIAL_SET_SECURE_STATE appropriately', function () {
    expect(garageReducer(generateTestState({
      secure: 'OFF',
    }), {
      type: 'INITIAL_SET_SECURE_STATE',
      payload: 'ON',
    })).to.deep.equal(generateTestState({
      secure: 'ON',
    }));
  });
  it('should should ignore an error passed as INITIAL_SET_SECURE_STATE', function () {
    expect(garageReducer(generateTestState({
      secure: 'OFF',
    }), {
      type: 'INITIAL_SET_SECURE_STATE',
      payload: error,
      error: true,
    })).to.deep.equal(generateTestState({
      secure: 'OFF',
    }));
  });
});
