import * as constants from '../constants';

const door = (state = 'CLOSED', action) => {
  switch (action.type) {
    case 'OPEN_DOOR':
      if ((state === 'CLOSED') || (state === 'CLOSING')) {
        return 'OPENING';
      } else if (state === 'UNKNOWN') {
        return 'MOVING';
      }
      return state;
    case 'CLOSE_DOOR':
      if ((state === 'OPEN') || (state === 'OPENING')) {
        return 'CLOSING';
      } else if (state === 'UNKNOWN') {
        return 'MOVING';
      }
      return state;
    case 'MOVEMENT_TIMEOUT':
      if ((state === 'OPENING') || (state === 'CLOSING')) {
        return 'OPEN';
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
