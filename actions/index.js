import { createAction } from 'redux-actions';

export const MEASURED_DISTANCE = 'MEASURED_DISTANCE';
export const OPEN_DOOR = 'OPEN_DOOR';
export const CLOSE_DOOR = 'CLOSE_DOOR';
export const UNSECURE_DOOR = 'UNSECURE_DOOR';
export const SECURE_DOOR = 'SECURE_DOOR';
export const TURN_ON_TIMEOUT = 'TURN_ON_TIMEOUT';
export const MOVEMENT_TIMEOUT = 'MOVEMENT_TIMEOUT';

export const measuredDistance = createAction(MEASURED_DISTANCE);

export const openDoor = createAction(OPEN_DOOR);

export const closeDoor = createAction(CLOSE_DOOR);

export const unsecureDoor = createAction(UNSECURE_DOOR);

export const secureDoor = createAction(SECURE_DOOR);

export const turnOnTimeout = createAction(TURN_ON_TIMEOUT);

export const movementTimeout = createAction(MOVEMENT_TIMEOUT);
