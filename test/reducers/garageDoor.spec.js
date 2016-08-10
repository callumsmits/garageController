import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const reducerTestSecureConfig = { secure: 'OFF' };
const reducerTestDoorConfig = [
  {
    action: { type: 'DOOR_RELAY_ON_REQUEST' },
    stateReductions: [
      {
        start: { door: 'CLOSED' },
        end: { door: 'CLOSED_RELAY_ON_REQUEST' },
      },
      {
        start: { door: 'OPEN' },
        end: { door: 'OPEN_RELAY_ON_REQUEST' },
      },
      {
        start: { door: 'UNKNOWN' },
        end: { door: 'UNKNOWN_RELAY_ON_REQUEST' },
      },
      {
        start: { door: 'OPENING' },
        end: { door: 'OPENING' },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_ON_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: { door: 'CLOSED_RELAY_ON_REQUEST' },
        end: { door: 'CLOSED_RELAY_ON' },
      },
      {
        start: { door: 'OPEN_RELAY_ON_REQUEST' },
        end: { door: 'OPEN_RELAY_ON' },
      },
      {
        start: { door: 'UNKNOWN_RELAY_ON_REQUEST' },
        end: { door: 'UNKNOWN_RELAY_ON' },
      },
      {
        start: { door: 'OPENING' },
        end: { door: 'OPENING' },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_OFF_REQUEST' },
    stateReductions: [
      {
        start: { door: 'CLOSED_RELAY_ON' },
        end: { door: 'CLOSED_RELAY_OFF_REQUEST' },
      },
      {
        start: { door: 'OPEN_RELAY_ON' },
        end: { door: 'OPEN_RELAY_OFF_REQUEST' },
      },
      {
        start: { door: 'UNKNOWN_RELAY_ON' },
        end: { door: 'UNKNOWN_RELAY_OFF_REQUEST' },
      },
      {
        start: { door: 'OPENING' },
        end: { door: 'OPENING' },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_OFF_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: { door: 'CLOSED_RELAY_OFF_REQUEST' },
        end: { door: 'CLOSING' },
      },
      {
        start: { door: 'OPEN_RELAY_OFF_REQUEST' },
        end: { door: 'OPENING' },
      },
      {
        start: { door: 'UNKNOWN_RELAY_OFF_REQUEST' },
        end: { door: 'MOVING' },
      },
      {
        start: { door: 'OPENING' },
        end: { door: 'OPENING' },
      },
    ],
  },
  {
    action: { type: 'MOVEMENT_TIMEOUT' },
    stateReductions: [
      {
        start: { door: 'OPENING' },
        end: { door: 'OPEN' },
      },
      {
        start: { door: 'CLOSING' },
        end: { door: 'CLOSED' },
      },
      {
        start: { door: 'MOVING' },
        end: { door: 'UNKNOWN' },
      },
      {
        start: { door: 'CLOSED' },
        end: { door: 'CLOSED' },
      },
    ],
  },
];

function runSingleTest(test) {
  it(`should handle ${test.action.type} action`, function () {
    test.stateReductions.forEach((e) => {
      const startState = Object.assign({}, e.start, reducerTestSecureConfig);
      const expectedEndState = Object.assign({}, e.end, reducerTestSecureConfig);
      expect(garageReducer(startState, test.action)).to.deep.equal(expectedEndState);
    });
  });
}

describe('garage door reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });

  reducerTestDoorConfig.forEach((test) => {
    runSingleTest(test);
  }, this);

  it('should convert state to CLOSED with DISTANCE action below threshold', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSING',
    }, {
      type: 'DISTANCE',
      payload: 10,
    })).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should convert state to UNKNOWN with DISTANCE action' +
    ' above threshold only if in closed state', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'DISTANCE',
      payload: 100,
    })).to.deep.equal({
      secure: 'OFF',
      door: 'UNKNOWN',
    });
    expect(garageReducer({
      secure: 'OFF',
      door: 'OPEN',
    }, {
      type: 'DISTANCE',
      payload: 100,
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPEN',
    });
  });
});
