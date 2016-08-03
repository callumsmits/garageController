import chai from 'chai';
import * as actions from '../../actions';

const expect = chai.expect;

const error = new TypeError('not a number');
describe('garage actions', function () {
  it('measuredDistance should create MEASURED_DISTANCE action', function() {
    expect(actions.measuredDistance(5)).to.deep.equal({
      type: 'MEASURED_DISTANCE',
      payload: 5,
    });
  });
  it('measuredDistance should create MEASURED_DISTANCE action with error', function () {
    expect(actions.measuredDistance(error)).to.deep.equal({
      type: 'MEASURED_DISTANCE',
      payload: error,
      error: true,
    });
  });
  it('openDoor should create OPEN_DOOR action', function () {
    expect(actions.openDoor()).to.deep.equal({
      type: 'OPEN_DOOR',
    });
  });
});
