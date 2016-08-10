import * as constants from '../constants';

const door = (state = { position: 'CLOSED' }, action) => {
  switch (action.type) {
    case 'DOOR_RELAY_ON_REQUEST':
      switch (state.position) {
        case 'OPEN':
        case 'CLOSED':
        case 'UNKNOWN':
          return Object.assign({}, state, { request: 'RELAY_ON_REQUEST' });
        default:
          return state;
      }
    case 'DOOR_RELAY_ON_REQUEST_COMPLETE':
      switch (state.position) {
        case 'OPEN':
        case 'CLOSED':
        case 'UNKNOWN':
          return Object.assign({}, state, { request: 'RELAY_ON' });
        default:
          return state;
      }
    case 'DOOR_RELAY_OFF_REQUEST':
      switch (state.position) {
        case 'OPEN':
        case 'CLOSED':
        case 'UNKNOWN':
          return Object.assign({}, state, { request: 'RELAY_OFF_REQUEST' });
        default:
          return state;
      }
    case 'DOOR_RELAY_OFF_REQUEST_COMPLETE':
      switch (state.position) {
        case 'OPEN':
          return { position: 'CLOSING' };
        case 'CLOSED':
          return { position: 'OPENING' };
        case 'UNKNOWN':
          return { position: 'MOVING' };
        default:
          return state;
      }
    case 'MOVEMENT_TIMEOUT':
      switch (state.position) {
        case 'OPENING':
          return { position: 'OPEN' };
        case 'CLOSING':
          return { position: 'CLOSED' };
        case 'MOVING':
          return { position: 'UNKNOWN' };
        default:
          return state;
      }
    case 'DISTANCE':
      if (action.payload < constants.closedDistanceThreshold) {
        return { position: 'CLOSED' };
      }
      if ((state.position === 'CLOSED') && (action.payload > constants.closedDistanceThreshold)) {
        return { position: 'UNKNOWN' };
      }
      return state;
    default:
      return state;
  }
};

export default door;
