import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

import * as constants from '../constants';
import * as actionTypes from './actionTypes.js';

export const measuredDistance = createAction(actionTypes.MEASURED_DISTANCE);

export const openDoor = createAction(actionTypes.OPEN_DOOR);

export const closeDoor = createAction(actionTypes.CLOSE_DOOR);

export const turnOnRequest = createAction(actionTypes.TURN_ON_REQUEST);

export const turnOnRequestComplete = createAction(actionTypes.TURN_ON_REQUEST_COMPLETE);

export const secureDoor = createAction(actionTypes.SECURE_DOOR);

export const turnOnTimeout = createAction(actionTypes.TURN_ON_TIMEOUT);

export const movementTimeout = createAction(actionTypes.MOVEMENT_TIMEOUT);

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export function startTurnOnTimer(id) {
  return (dispatch) => delay(constants.garageSecureTurnOnDelay)
                        .then(() => dispatch(turnOnTimeout(id)));
}

export function unsecureDoor() {
  return (dispatch) => {
    dispatch(turnOnRequest());

    const timeId = Date.now();
    return fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`, {
      method: 'POST',
      body: JSON.stringify({
        secure: 1,
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      json.id = timeId;
      dispatch(turnOnRequestComplete(json));
    })
    .catch((err) => dispatch(turnOnRequestComplete(err)))
    .then(() => dispatch(startTurnOnTimer(timeId)));
  };
}
