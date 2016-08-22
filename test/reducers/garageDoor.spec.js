import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const error = new TypeError('not a number');

const reducerTestBaseConfig = { secure: 'OFF', distanceRequest: 'NONE' };
const reducerTestDoorConfig = [
  {
    action: { type: 'DOOR_RELAY_REQUEST' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED' },
        },
        end: {
          door: { position: 'CLOSED', request: 'RELAY_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'OPEN' },
        },
        end: {
          door: { position: 'OPEN', request: 'RELAY_REQUEST' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN' },
        },
        end: {
          door: { position: 'UNKNOWN', request: 'RELAY_REQUEST' },
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
    action: { type: 'DOOR_RELAY_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED', request: 'RELAY_REQUEST' },
        },
        end: {
          door: { position: 'OPENING' },
        },
      },
      {
        start: {
          door: { position: 'OPEN', request: 'RELAY_REQUEST' },
        },
        end: {
          door: { position: 'CLOSING' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN', request: 'RELAY_REQUEST' },
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
    action: { type: 'DOOR_RELAY_REQUEST_COMPLETE', payload: error, error: true },
    extraTitleText: 'with error appropriately',
    stateReductions: [
      {
        start: {
          door: { position: 'CLOSED', request: 'RELAY_REQUEST' },
        },
        end: {
          door: { position: 'CLOSED' },
        },
      },
      {
        start: {
          door: { position: 'OPEN', request: 'RELAY_REQUEST' },
        },
        end: {
          door: { position: 'OPEN' },
        },
      },
      {
        start: {
          door: { position: 'UNKNOWN', request: 'RELAY_REQUEST' },
        },
        end: {
          door: { position: 'UNKNOWN' },
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

function generateTestState(door) {
  return Object.assign({}, reducerTestBaseConfig, door);
}

function runSingleTest(test) {
  it(`should handle ${test.action.type} action ${test.extraTitleText}`, function () {
    test.stateReductions.forEach((e) => {
      const startState = generateTestState(e.start);
      const expectedEndState = generateTestState(e.end);
      expect(garageReducer(startState, test.action)).to.deep.equal(expectedEndState);
    });
  });
}

describe('garage door reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal(generateTestState({
      door: {
        position: 'CLOSED',
      },
    }));
  });

  reducerTestDoorConfig.forEach((test) => {
    runSingleTest(test);
  }, this);

  it('should convert state to CLOSED with DISTANCE action above threshold', function () {
    expect(garageReducer(generateTestState({
      door: { position: 'UNKNOWN' },
    }), {
      type: 'MEASURED_DISTANCE',
      payload: 150,
    })).to.deep.equal(generateTestState({
      door: { position: 'CLOSED' },
    }));
  });
  it('should convert state to OPEN with DISTANCE action below threshold if in CLOSED or UNKNOWN states', function () {
    expect(garageReducer(generateTestState({
      door: { position: 'CLOSED' },
    }), {
      type: 'MEASURED_DISTANCE',
      payload: 25,
    })).to.deep.equal(generateTestState({
      door: { position: 'OPEN' },
    }));
    expect(garageReducer(generateTestState({
      door: { position: 'OPENING' },
    }), {
      type: 'MEASURED_DISTANCE',
      payload: 25,
    })).to.deep.equal(generateTestState({
      door: { position: 'OPENING' },
    }));
  });
/*  it('should convert state to UNKNOWN with DISTANCE action' +
    ' below threshold only if in closed state', function () {
    expect(garageReducer(generateTestState({
      door: { position: 'CLOSED' },
    }), {
      type: 'MEASURED_DISTANCE',
      payload: 10,
    })).to.deep.equal(generateTestState({
      door: { position: 'UNKNOWN' },
    }));
    expect(garageReducer(generateTestState({
      door: { position: 'OPEN' },
    }), {
      type: 'MEASURED_DISTANCE',
      payload: 10,
    })).to.deep.equal(generateTestState({
      door: { position: 'OPEN' },
    }));
  });
  */
});
