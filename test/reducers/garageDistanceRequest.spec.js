import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const error = new TypeError('not a number');

const reducerTestBaseConfig = { door: { position: 'CLOSED' }, secure: 'OFF' };
const reducerTestDoorConfig = [
  {
    action: { type: 'DISTANCE_REQUEST' },
    stateReductions: [
      {
        start: {
          distanceRequest: 'NONE',
        },
        end: {
          distanceRequest: 'DISTANCE_REQUEST',
        },
      },
      {
        start: {
          distanceRequest: 'DISTANCE_REQUEST_COMPLETE',
        },
        end: {
          distanceRequest: 'DISTANCE_REQUEST_COMPLETE',
        },
      },
    ],
  },
  {
    action: { type: 'DISTANCE_REQUEST_COMPLETE' },
    stateReductions: [
      {
        start: {
          distanceRequest: 'DISTANCE_REQUEST',
        },
        end: {
          distanceRequest: 'NONE',
        },
      },
      {
        start: {
          distanceRequest: 'NONE',
        },
        end: {
          distanceRequest: 'NONE',
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

  reducerTestDoorConfig.forEach((test) => {
    runSingleTest(test);
  }, this);
});
