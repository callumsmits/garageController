import { createAction } from 'redux-actions';

export const MEASURED_DISTANCE = 'MEASURED_DISTANCE';
export const OPEN_DOOR = 'OPEN_DOOR';

export const measuredDistance = createAction(MEASURED_DISTANCE);

export const openDoor = createAction(OPEN_DOOR);
