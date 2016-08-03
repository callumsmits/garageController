import { combineReducers } from 'redux';

const garageReducer = (state = { secure: 'OFF', door: 'CLOSED' }, action) => {
  switch (action.type) {
    case 'UNSECURE_DOOR':
      return Object.assign({}, state, {
        secure: 'TURNING_ON',
      });
    default:
      return state;
  }
};

export default garageReducer;
