import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

import * as constants from '../constants';
import * as actionTypes from './actionTypes.js';

export const measuredDistance = createAction(actionTypes.MEASURED_DISTANCE);

export const doorRelayOnRequest = createAction(actionTypes.DOOR_RELAY_ON_REQUEST);

export const doorRelayOnRequestComplete = createAction(actionTypes.DOOR_RELAY_ON_REQUEST_COMPLETE);

export const doorRelayOffRequest = createAction(actionTypes.DOOR_RELAY_OFF_REQUEST);

export const doorRelayOffRequestComplete =
createAction(actionTypes.DOOR_RELAY_OFF_REQUEST_COMPLETE);

export const closeDoor = createAction(actionTypes.CLOSE_DOOR);

export const movementTimeout = createAction(actionTypes.MOVEMENT_TIMEOUT);

export const movementRequest = createAction(actionTypes.MOVEMENT_REQUEST);

export const movementRequestComplete = createAction(actionTypes.MOVEMENT_REQUEST_COMPLETE);

export const turnOnRequest = createAction(actionTypes.TURN_ON_REQUEST);

export const turnOnRequestComplete = createAction(actionTypes.TURN_ON_REQUEST_COMPLETE);

export const turnOffRequest = createAction(actionTypes.TURN_OFF_REQUEST);

export const turnOffRequestComplete = createAction(actionTypes.TURN_OFF_REQUEST_COMPLETE);

export const turnOnTimeout = createAction(actionTypes.TURN_ON_TIMEOUT);


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
        secure: 0,
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      const request = json;
      request.id = timeId;
      dispatch(turnOnRequestComplete(request));
    })
    .catch((err) => dispatch(turnOnRequestComplete(err)))
    .then(() => dispatch(startTurnOnTimer(timeId)));
  };
}

export function secureDoor() {
  return (dispatch) => {
    dispatch(turnOffRequest());

    return fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`, {
      method: 'POST',
      body: JSON.stringify({
        secure: 1,
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      dispatch(turnOffRequestComplete(json));
    })
    .catch((err) => dispatch(turnOffRequestComplete(err)));
  };
}

export function triggerDoorRelay() {
  return (dispatch) => {
    dispatch(doorRelayOnRequest());

    return fetch(`${constants.garageDeviceAddress}${constants.garageDoorStateURL}`, {
      method: 'POST',
      body: JSON.stringify({
        door: 1,
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      dispatch(doorRelayOnRequestComplete(json));
    })
    .catch((err) => dispatch(doorRelayOnRequestComplete(err)))
    .then(() => delay(constants.garageDoorMovementDelay))
    .then(() => dispatch(doorRelayOffRequest()))
    .then(() => fetch(`${constants.garageDeviceAddress}${constants.garageDoorStateURL}`, {
      method: 'POST',
      body: JSON.stringify({
        door: 0,
      }),
    }))
    .then((res) => res.json())
    .then((json) => {
      dispatch(doorRelayOffRequestComplete(json));
    })
    .catch((err) => dispatch(doorRelayOffRequestComplete(err)));
  };
}
