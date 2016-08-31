import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

import * as constants from '../constants';
import * as actionTypes from './actionTypes.js';

export const measuredDistance = createAction(actionTypes.MEASURED_DISTANCE);

export const doorRelayRequest = createAction(actionTypes.DOOR_RELAY_REQUEST);

export const doorRelayRequestComplete = createAction(actionTypes.DOOR_RELAY_REQUEST_COMPLETE);

export const movementTimeout = createAction(actionTypes.MOVEMENT_TIMEOUT);

export const movementRequest = createAction(actionTypes.MOVEMENT_REQUEST);

export const movementRequestComplete = createAction(actionTypes.MOVEMENT_REQUEST_COMPLETE);

export const turnOnRequest = createAction(actionTypes.TURN_ON_REQUEST);

export const turnOnRequestComplete = createAction(actionTypes.TURN_ON_REQUEST_COMPLETE);

export const turnOffRequest = createAction(actionTypes.TURN_OFF_REQUEST);

export const turnOffRequestComplete = createAction(actionTypes.TURN_OFF_REQUEST_COMPLETE);

export const turnOnTimeout = createAction(actionTypes.TURN_ON_TIMEOUT);

export const distanceRequest = createAction(actionTypes.DISTANCE_REQUEST);

export const distanceRequestComplete = createAction(actionTypes.DISTANCE_REQUEST_COMPLETE);

export const initialSetSecureState = createAction(actionTypes.INITIAL_SET_SECURE_STATE);

export const enableDemoMode = createAction(actionTypes.ENABLE_DEMO_MODE);

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function promiseResolvingToJSONReturningFunction(json) {
  return new Promise(function (resolve) {
    resolve({
      json: () => json,
    });
  });
}

export function startTurnOnTimer(id) {
  return (dispatch) => delay(constants.garageSecureTurnOnDelay)
                        .then(() => dispatch(turnOnTimeout(id)));
}

export function unsecureDoor() {
  return (dispatch, getState) => {
    dispatch(turnOnRequest());

    const timeId = Date.now();
    return (getState().demo ?
      promiseResolvingToJSONReturningFunction({ secure: 0, id: timeId }) :
      fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`, {
        method: 'POST',
        body: JSON.stringify({
          secure: 0,
        }),
      })
    )
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
  return (dispatch, getState) => {
    dispatch(turnOffRequest());

    return (getState().demo ?
      promiseResolvingToJSONReturningFunction({ secure: 1 }) :
      fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`, {
        method: 'POST',
        body: JSON.stringify({
          secure: 1,
        }),
      })
    )
    .then((res) => res.json())
    .then((json) => {
      dispatch(turnOffRequestComplete(json));
    })
    .catch((err) => dispatch(turnOffRequestComplete(err)));
  };
}

export function triggerDoorRelay() {
  return (dispatch, getState) => {
    dispatch(doorRelayRequest());

    return (getState().demo ?
      promiseResolvingToJSONReturningFunction({ door: 1 }) :
      fetch(`${constants.garageDeviceAddress}${constants.garageDoorStateURL}`, {
        method: 'POST',
        body: JSON.stringify({
          door: 1,
        }),
      })
    )
    .then((res) => res.json())
    .then((json) => {
      dispatch(doorRelayRequestComplete(json));
    })
    .catch((err) => dispatch(doorRelayRequestComplete(err)));
  };
}

export function openDoor() {
  return (dispatch) => dispatch(triggerDoorRelay())
    .then(() => delay(constants.garageDoorMovementDelay))
    .then(() => dispatch(movementTimeout()));
}

export function closeDoor() {
  return (dispatch) => dispatch(triggerDoorRelay())
    .then(() => delay(constants.garageDoorMovementDelay))
    .then(() => dispatch(movementTimeout()));
}

export function unsecureAndOpenDoor() {
  return (dispatch, getState) =>
    dispatch(unsecureDoor())
    .then(() => delay(constants.garageSecureToMoveDelay))
    .then(() => {
      const { secure } = getState();

      if (secure === 'ON') {
        return dispatch(openDoor());
      }
      return {};
    }
  );
}

export function closeAndSecureDoor() {
  return (dispatch, getState) => {
    if (getState().secure !== 'ON') {
      return dispatch(unsecureDoor())
      .then(() => dispatch(closeDoor()))
      .then(() => delay(constants.garageSecureToMoveDelay))
      .then(() => {
        const { door } = getState();
        if (door.position === 'CLOSED') {
          return dispatch(secureDoor());
        }
        return {};
      });
    }
    return dispatch(closeDoor())
    .then(() => delay(constants.garageSecureToMoveDelay))
    .then(() => {
      const { door } = getState();
      if (door.position === 'CLOSED') {
        return dispatch(secureDoor());
      }
      return {};
    });
  };
}

export function getDistance() {
  return (dispatch, getState) => (getState().demo ?
    0 :
    (function () {
      dispatch(distanceRequest());
      return fetch(`${constants.garageDeviceAddress}${constants.garageDistanceURL}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(distanceRequestComplete());
        return json;
      })
      .catch(() => dispatch(distanceRequestComplete()))
      .then((json) => dispatch(measuredDistance(json.distance)));
    }())
  );
}

export function startMonitoringDistance(iterations = -1) {
  return (dispatch, getState) => {
    if (getState().demo) {
      return 0;
    }
    if (iterations !== 0) {
      setTimeout(() => dispatch(startMonitoringDistance(iterations - 1)),
        constants.garageInterDistanceMeasurementDelay);
    }
    return dispatch(getDistance());
  };
}

export function getInitialSecureState() {
  return (dispatch) => {
    const load = fetch(`${constants.garageDeviceAddress}${constants.garageSecureStateURL}`);
    return Promise.race([load, delay(constants.acceptableTimeLimitForInitialRequest)])
    .then((res) => {
      if (res instanceof Response) {
        return res.json();
      }
      dispatch(enableDemoMode());
      return {};
    })
    .then((json) => {
      if (json.secure === 0) {
        dispatch(initialSetSecureState('ON'));
      } else if (json.secure === 1) {
        dispatch(initialSetSecureState('OFF'));
      }
      return json;
    })
    .catch(() => dispatch(enableDemoMode()));
  };
}
