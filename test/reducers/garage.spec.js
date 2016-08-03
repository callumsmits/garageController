import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

describe('garage reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should respond to UNSECURE_DOOR action', function () {
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
});
