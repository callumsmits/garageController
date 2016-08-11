import 'babel-polyfill';
import chai from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions';
import * as constants from '../../constants';

const expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('garage async actions', function () {
  afterEach(() => {
    nock.cleanAll();
  });

  it('sends correct actions after unsecureDoor request', function () {
    nock(constants.garageDeviceAddress)
      .post(constants.garageSecureStateURL, {
        secure: 0,
      })
      .reply(201, {
        secure: 0,
      });

    const expectedActions = [
      { type: types.TURN_ON_REQUEST },
      { type: types.TURN_ON_REQUEST_COMPLETE, payload: { secure: 0, id: 1 } },
      { type: types.TURN_ON_TIMEOUT, payload: 1 },
    ];

    const store = mockStore({ secure: 'OFF', door: { position: 'CLOSED' } });
    return store.dispatch(actions.unsecureDoor())
      .then(() => {
        const storeActions = store.getActions();
        // Can't predict what the date.now was during action, so just replace
        storeActions[1].payload.id = 1;
        if (storeActions.length > 2) {
          storeActions[2].payload = 1;
        }
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('sends correct actions after secureDoor request', function () {
    nock(constants.garageDeviceAddress)
      .post(constants.garageSecureStateURL, {
        secure: 1,
      })
      .reply(201, {
        secure: 1,
      });

    const expectedActions = [
      { type: types.TURN_OFF_REQUEST },
      { type: types.TURN_OFF_REQUEST_COMPLETE, payload: { secure: 1 } },
    ];

    const store = mockStore({ secure: 'ON', door: { position: 'CLOSED' } });
    return store.dispatch(actions.secureDoor())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('sends correct actions after triggerDoorRelay request', function () {
    nock(constants.garageDeviceAddress)
      .post(constants.garageDoorStateURL, {
        door: 1,
      })
      .reply(200, {
        door: 1,
      });

    const expectedActions = [
      { type: types.DOOR_RELAY_REQUEST },
      { type: types.DOOR_RELAY_REQUEST_COMPLETE, payload: { door: 1 } },
    ];

    const store = mockStore({ secure: 'OFF', door: { position: 'CLOSED' } });
    return store.dispatch(actions.triggerDoorRelay())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('sends correct actions after openDoor request', function () {
    nock(constants.garageDeviceAddress)
      .post(constants.garageDoorStateURL, {
        door: 1,
      })
      .reply(200, {
        door: 1,
      });

    const expectedActions = [
      { type: types.DOOR_RELAY_REQUEST },
      { type: types.DOOR_RELAY_REQUEST_COMPLETE, payload: { door: 1 } },
      { type: types.MOVEMENT_TIMEOUT },
    ];

    const store = mockStore({ secure: 'ON', door: 'CLOSED' });
    return store.dispatch(actions.openDoor())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
