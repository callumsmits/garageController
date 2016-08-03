import { combineReducers } from 'redux';
import door from './door.js';
import secure from './secure.js';

const garageReducer = combineReducers({
  secure,
  door,
});

export default garageReducer;
