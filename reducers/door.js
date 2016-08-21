import * as constants from '../constants';
import * as actionTypes from '../actions/actionTypes.js';

const door = (state = { position: 'CLOSED' }, action) => {
  switch (action.type) {
    case actionTypes.DOOR_RELAY_REQUEST:
      switch (state.position) {
        case 'OPEN':
        case 'CLOSED':
        case 'UNKNOWN':
          return Object.assign({}, state, { request: 'RELAY_REQUEST' });
        default:
          return state;
      }
    case actionTypes.DOOR_RELAY_REQUEST_COMPLETE:
      if (action.error) {
        return { position: state.position };
      }
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
    case actionTypes.MOVEMENT_TIMEOUT:
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
    case actionTypes.MEASURED_DISTANCE:
      if (action.payload < constants.closedDistanceThreshold) {
        return { position: 'CLOSED' };
      }
      if (((state.position === 'CLOSED') || (state.position === 'UNKNOWN'))
       && (action.payload > constants.closedDistanceThreshold)) {
        return { position: 'OPEN' };
      }
      return state;
    default:
      return state;
  }
};

export default door;
