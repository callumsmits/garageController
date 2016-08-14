import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const error = new TypeError('not a number');

const reducerTestBaseConfig = { door: { position: 'CLOSED' }, secure: 'OFF' };
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
];

function generateTestState(distance) {
  return Object.assign({}, reducerTestBaseConfig, distance);
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

describe('garage distance reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal(generateTestState({
      distanceRequest: 'NONE',
    }));
  });
});
