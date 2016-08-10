import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const reducerTestSecureConfig = { secure: 'OFF' };
const reducerTestDoorConfig = [
  {
    action: { type: 'DOOR_RELAY_ON_REQUEST' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED' },
        },
        end: {
          door: { position: 'CLOSED', request: 'RELAY_ON_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'OPEN' },
        },
        end: {
          door: { position: 'OPEN', request: 'RELAY_ON_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN' },
        },
        end: {
          door: { position: 'UNKNOWN', request: 'RELAY_ON_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'OPENING' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_ON_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED', request: 'RELAY_ON_REQUEST' },
        },
        end: {
          door: { position: 'CLOSED', request: 'RELAY_ON' },
        },
      },
      {
        start: {
          door: { position: 'OPEN', request: 'RELAY_ON_REQUEST' },
        },
        end: {
          door: { position: 'OPEN', request: 'RELAY_ON' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN', request: 'RELAY_ON_REQUEST' },
        },
        end: {
          door: { position: 'UNKNOWN', request: 'RELAY_ON' },
        },
      },
      {
        start: {
          door: { position: 'OPENING' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_OFF_REQUEST' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED', request: 'RELAY_ON' },
        },
        end: {
          door: { position: 'CLOSED', request: 'RELAY_OFF_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'OPEN', request: 'RELAY_ON' },
        },
        end: {
          door: { position: 'OPEN', request: 'RELAY_OFF_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN', request: 'RELAY_ON' },
        },
        end: {
          door: { position: 'UNKNOWN', request: 'RELAY_OFF_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'OPENING' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
    ],
  },
  {
    action: { type: 'DOOR_RELAY_OFF_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED', request: 'RELAY_OFF_REQUEST' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
      {
        start: {
          door: { position: 'OPEN', request: 'RELAY_OFF_REQUEST' },
        },
        end: {
          door: { position: 'CLOSING' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN', request: 'RELAY_OFF_REQUEST' },
        },
        end: {
          door: { position: 'MOVING' },
        },
      },
      {
        start: {
          door: { position: 'OPENING' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
    ],
  },
  {
    action: { type: 'MOVEMENT_TIMEOUT' },
    stateReductions: [
      {
        start: {
          door: { position: 'OPENING' },
        },
        end: {
          door: { position: 'OPEN' },
        },
      },
      {
        start: {
          door: { position: 'CLOSING' },
        },
        end: {
          door: { position: 'CLOSED' },
        },
      },
      {
        start: {
          door: { position: 'MOVING' },
        },
        end: {
          door: { position: 'UNKNOWN' },
        },
      },
      {
        start: {
          door: { position: 'CLOSED' },
        },
        end: {
          door: { position: 'CLOSED' },
        },
      },
    ],
  },
];

function runSingleTest(test) {
  it(`should handle ${test.action.type} action ${test.extraTitleText}`, function () {
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
      door: {
        position: 'CLOSED',
      },
    });
  });

  reducerTestDoorConfig.forEach((test) => {
    runSingleTest(test);
  }, this);

  it('should convert state to CLOSED with DISTANCE action below threshold', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: { position: 'UNKNOWN' },
    }, {
      type: 'DISTANCE',
      payload: 10,
    })).to.deep.equal({
      secure: 'OFF',
      door: { position: 'CLOSED' },
    });
  });
  it('should convert state to UNKNOWN with DISTANCE action' +
    ' above threshold only if in closed state', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: { position: 'CLOSED' },
    }, {
      type: 'DISTANCE',
      payload: 100,
    })).to.deep.equal({
      secure: 'OFF',
      door: { position: 'UNKNOWN' },
    });
    expect(garageReducer({
      secure: 'OFF',
      door: { position: 'OPEN' },
    }, {
      type: 'DISTANCE',
      payload: 100,
    })).to.deep.equal({
      secure: 'OFF',
      door: { position: 'OPEN' },
    });
  });
});
