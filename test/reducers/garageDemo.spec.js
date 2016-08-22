import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

const reducerTestBaseConfig = { door: { position: 'CLOSED' }, distanceRequest: 'NONE', secure: 'OFF' };

function generateTestState(demo) {
  return Object.assign({}, reducerTestBaseConfig, demo);
}

describe('garage demo reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal(generateTestState({
      demo: false,
    }));
  });

  it('should handle ENABLE_DEMO_MODE action', function () {
    expect(garageReducer(generateTestState({
      demo: false,
    }), {
      type: 'ENABLE_DEMO_MODE',
    })).to.deep.equal(generateTestState({
      demo: true,
    }));
  });
});
