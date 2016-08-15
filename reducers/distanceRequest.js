import * as actionTypes from '../actions/actionTypes.js';

const distanceRequest = (state = 'NONE', action) => {
  switch (action.type) {
    case 'DISTANCE_REQUEST':
      if (state === 'NONE') {
        return 'DISTANCE_REQUEST';
      }
      return state;
    case 'DISTANCE_REQUEST_COMPLETE':
      if (state === 'DISTANCE_REQUEST') {
        return 'NONE';
      }
      return state;
    default:
      return state;
  }
};

export default distanceRequest;
