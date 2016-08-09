import * as constants from '../constants';

const door = (state = 'CLOSED', action) => {
  switch (action.type) {
    case 'OPEN_REQUEST':
      if (state === 'CLOSED') {
        return 'OPEN_REQUEST';
      }
      return state;
    case 'OPEN_REQUEST_COMPLETE':
      if (state === 'OPEN_REQUEST') {
        return 'OPENING';
      }
      return state;
    case 'CLOSE_REQUEST':
      if (state === 'OPEN') {
        return 'CLOSE_REQUEST';
      }
      return state;
    case 'CLOSE_REQUEST_COMPLETE':
      if (state === 'CLOSE_REQUEST') {
        return 'CLOSING';
      }
      return state;
    case 'MOVEMENT_REQUEST':
      if (state === 'UNKNOWN') {
        return 'MOVEMENT_REQUEST';
      }
      return state;
    case 'MOVEMENT_REQUEST_COMPLETE':
      if (state === 'MOVEMENT_REQUEST') {
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
      return state;
    default:
      return state;
  }
};

export default door;
