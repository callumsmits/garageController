import * as actionTypes from '../actions/actionTypes.js';

const demo = (state = false, action) => {
  if (action.type === actionTypes.ENABLE_DEMO_MODE) {
    return true;
  }
  return state;
};

export default demo;
