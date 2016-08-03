import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

describe('garage door reducers', function () {
  it('should handle initial state', function () {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
  it('should handle OPEN_DOOR action', function () {
    expect(garageReducer({
      secure: 'OFF',
      door: 'CLOSED',
    }, {
      type: 'OPEN_DOOR',
    })).to.deep.equal({
      secure: 'OFF',
      door: 'OPENING',
    });
  });
});
