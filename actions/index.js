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

export function unsecureDoor() {
  return (dispatch) => {
    dispatch(turnOnRequest());

    return fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`, {
      method: 'POST',
      body: JSON.stringify({
        secure: 1,
      }),
    })
    .then((res) => res.json())
    .then((json) => dispatch(turnOnRequestComplete(json)))
    .catch((err) => dispatch(turnOnRequestComplete(err)));
  };
}
