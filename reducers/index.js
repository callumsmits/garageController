import { combineReducers } from 'redux';
import door from './door.js';
import secure from './secure.js';
import distanceRequest from './distanceRequest.js';
import demo from './demo.js';

const garageReducer = combineReducers({
  secure,
  door,
  distanceRequest,
  demo,
});

export default garageReducer;
