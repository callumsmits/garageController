import chai from 'chai';
import garageReducer from '../../reducers';

const expect = chai.expect;

describe('garage reducers', function () {
  it('should handle initial state', function() {
    expect(garageReducer(undefined, {})).to.deep.equal({
      secure: 'OFF',
      door: 'CLOSED',
    });
  });
});
