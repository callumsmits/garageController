import { combineReducers } from 'redux';
import door from './door.js';
import secure from './secure.js';
import distanceRequest from './distanceRequest.js';

const garageReducer = combineReducers({
  secure,
  door,
  distanceRequest,
});

export default garageReducer;
