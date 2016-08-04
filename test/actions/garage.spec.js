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
  it('closeDoor should create CLOSE_DOOR action', function () {
    expect(actions.closeDoor()).to.deep.equal({
      type: 'CLOSE_DOOR',
    });
  });
  it('turnOnRequest should create TURN_ON_REQUEST action', function () {
    expect(actions.turnOnRequest()).to.deep.equal({
      type: 'TURN_ON_REQUEST',
    });
  });
  it('secureDoor should create SECURE_DOOR action', function () {
    expect(actions.secureDoor()).to.deep.equal({
      type: 'SECURE_DOOR',
    });
  });
  it('turnOnTimeout should create TURN_ON_TIMEOUT action', function () {
    expect(actions.turnOnTimeout()).to.deep.equal({
      type: 'TURN_ON_TIMEOUT',
    });
  });
  it('movementTimeout should create MOVEMENT_TIMEOUT action', function () {
    expect(actions.movementTimeout()).to.deep.equal({
      type: 'MOVEMENT_TIMEOUT',
    });
  });
  it('turnOnRequestComplete should create TURN_ON_REQUEST_COMPLETE action', function () {
    expect(actions.turnOnRequestComplete({
      secure: 1,
    })).to.deep.equal({
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: {
        secure: 1,
      },
    });
  });
});
