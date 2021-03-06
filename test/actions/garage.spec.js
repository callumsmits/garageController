import chai from 'chai';
import * as actions from '../../actions';

const expect = chai.expect;

const error = new TypeError('not a number');
describe('garage actions', function () {
  it('measuredDistance should create MEASURED_DISTANCE action', function () {
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
  it('doorRelayRequest should create DOOR_RELAY_REQUEST} action', function () {
    expect(actions.doorRelayRequest()).to.deep.equal({
      type: 'DOOR_RELAY_REQUEST',
    });
  });
  it('doorRelayRequestComplete should create DOOR_RELAY_REQUEST_COMPLETE action', function () {
    expect(actions.doorRelayRequestComplete()).to.deep.equal({
      type: 'DOOR_RELAY_REQUEST_COMPLETE',
    });
  });
  it('movementTimeout should create MOVEMENT_TIMEOUT action', function () {
    expect(actions.movementTimeout()).to.deep.equal({
      type: 'MOVEMENT_TIMEOUT',
    });
  });
  it('movementRequest should create MOVEMENT_REQUEST action', function () {
    expect(actions.movementRequest()).to.deep.equal({
      type: 'MOVEMENT_REQUEST',
    });
  });
  it('movementRequestComplete should create MOVEMENT_REQUEST_COMPLETE action', function () {
    expect(actions.movementRequestComplete()).to.deep.equal({
      type: 'MOVEMENT_REQUEST_COMPLETE',
    });
  });
  it('turnOnRequest should create TURN_ON_REQUEST action', function () {
    expect(actions.turnOnRequest()).to.deep.equal({
      type: 'TURN_ON_REQUEST',
    });
  });
  it('turnOnTimeout should create TURN_ON_TIMEOUT action', function () {
    expect(actions.turnOnTimeout()).to.deep.equal({
      type: 'TURN_ON_TIMEOUT',
    });
  });
  it('turnOnRequestComplete should create TURN_ON_REQUEST_COMPLETE action', function () {
    expect(actions.turnOnRequestComplete({
      secure: 0,
    })).to.deep.equal({
      type: 'TURN_ON_REQUEST_COMPLETE',
      payload: {
        secure: 0,
      },
    });
  });
  it('turnOffRequest should create TURN_OFF_REQUEST action', function () {
    expect(actions.turnOffRequest()).to.deep.equal({
      type: 'TURN_OFF_REQUEST',
    });
  });
  it('turnOffRequestComplete should create TURN_OFF_REQUEST_COMPLETE action', function () {
    expect(actions.turnOffRequestComplete()).to.deep.equal({
      type: 'TURN_OFF_REQUEST_COMPLETE',
    });
  });
  it('distanceRequest should create DISTANCE_REQUEST action', function () {
    expect(actions.distanceRequest()).to.deep.equal({
      type: 'DISTANCE_REQUEST',
    });
  });
  it('distanceRequestComplete should create DISTANCE_REQUEST_COMPLETE action', function () {
    expect(actions.distanceRequestComplete()).to.deep.equal({
      type: 'DISTANCE_REQUEST_COMPLETE',
    });
  });
  it('initialSetSecureState should create INITIAL_SET_SECURE_STATE action', function () {
    expect(actions.initialSetSecureState('ON')).to.deep.equal({
      type: 'INITIAL_SET_SECURE_STATE',
      payload: 'ON',
    });
  });
  it('enableDemoMode should create ENABLE_DEMO_MODE action', function () {
    expect(actions.enableDemoMode()).to.deep.equal({
      type: 'ENABLE_DEMO_MODE',
    });
  });
});
