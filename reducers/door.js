import * as constants from '../constants';

const door = (state = 'CLOSED', action) => {
  switch (action.type) {
    case 'DOOR_RELAY_ON_REQUEST':
      if (state === 'OPEN') {
        return 'OPEN_RELAY_ON_REQUEST';
      }
      if (state === 'CLOSED') {
        return 'CLOSED_RELAY_ON_REQUEST';
      }
      if (state === 'UNKNOWN') {
        return 'UNKNOWN_RELAY_ON_REQUEST';
      }
      return state;
    case 'DOOR_RELAY_ON_REQUEST_COMPLETE':
      if (state === 'OPEN_RELAY_ON_REQUEST') {
        return 'OPEN_RELAY_ON';
      }
      if (state === 'CLOSED_RELAY_ON_REQUEST') {
        return 'CLOSED_RELAY_ON';
      }
      if (state === 'UNKNOWN_RELAY_ON_REQUEST') {
        return 'UNKNOWN_RELAY_ON';
      }
      return state;
    case 'DOOR_RELAY_OFF_REQUEST':
      if (state === 'OPEN_RELAY_ON') {
        return 'OPEN_RELAY_OFF_REQUEST';
      }
      if (state === 'CLOSED_RELAY_ON') {
        return 'CLOSED_RELAY_OFF_REQUEST';
      }
      if (state === 'UNKNOWN_RELAY_ON') {
        return 'UNKNOWN_RELAY_OFF_REQUEST';
      }
      return state;
    case 'DOOR_RELAY_OFF_REQUEST_COMPLETE':
      if (state === 'OPEN_RELAY_OFF_REQUEST') {
        return 'OPENING';
      }
      if (state === 'CLOSED_RELAY_OFF_REQUEST') {
        return 'CLOSING';
      }
      if (state === 'UNKNOWN_RELAY_OFF_REQUEST') {
        return 'MOVING';
      }
      return state;
    case 'MOVEMENT_TIMEOUT':
      if (state === 'OPENING') {
        return 'OPEN';
      } else if (state === 'CLOSING') {
        return 'CLOSED';
      } else if (state === 'MOVING') {
        return 'UNKNOWN';
      }
      return state;
    case 'DISTANCE':
      if (action.payload < constants.closedDistanceThreshold) {
        return 'CLOSED';
      }
      if ((state === 'CLOSED') && (action.payload > constants.closedDistanceThreshold)) {
        return 'UNKNOWN';
      }
      return state;
    default:
      return state;
  }
};

export default door;
