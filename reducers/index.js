import { combineReducers } from 'redux';

const garageReducer = (state = { secure: 'OFF', door: 'CLOSED' }, action) => {
	return state;
};

export default garageReducer;
