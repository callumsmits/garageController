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

  it('changes secure state to TURNING_ON when state has been set on device', function () {
    nock(constants.garageDeviceAddress)
      .post(constants.garageSecureStateURL, {
        secure: 1,
      })
      .reply(201, {
        secure: 1,
      });

    const expectedActions = [
      { type: types.TURN_ON_REQUEST },
      { type: types.TURN_ON_REQUEST_COMPLETE, payload: { secure: 1, id: 1 } },
      { type: types.TURN_ON_TIMEOUT, payload: 1 },
    ];

    const store = mockStore({ secure: 'OFF', door: 'CLOSED' });
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
});