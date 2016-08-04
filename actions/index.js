import { createAction } from 'redux-actions';

import * as actionTypes from './actionTypes.js';

export const measuredDistance = createAction(actionTypes.MEASURED_DISTANCE);

export const openDoor = createAction(actionTypes.OPEN_DOOR);

export const closeDoor = createAction(actionTypes.CLOSE_DOOR);

export const unsecureDoor = createAction(actionTypes.UNSECURE_DOOR);

export const secureDoor = createAction(actionTypes.SECURE_DOOR);

export const turnOnTimeout = createAction(actionTypes.TURN_ON_TIMEOUT);

export const movementTimeout = createAction(actionTypes.MOVEMENT_TIMEOUT);

export const turnOnComplete = createAction(actionTypes.TURN_ON_REQUEST_COMPLETE);
