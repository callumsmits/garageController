export const closedDistanceThreshold = 30; // cm

export const garageDeviceAddress = 'http://garage.local';

export const garageDoorStateURL = '/doorState';

export const garageSecureStateURL = '/secureState';

export const garageDistanceURL = '/distance';

let turnOnDelay = 4000;
if (process.env.NODE_ENV === 'test') {
  turnOnDelay = 10;
}

export const garageSecureTurnOnDelay = turnOnDelay;

let doorMovementDelay = 17000;
if (process.env.NODE_ENV === 'test') {
  doorMovementDelay = 30;
}

export const garageDoorMovementDelay = doorMovementDelay;

let secureToMoveDelay = 1000;
if (process.env.NODE_ENV === 'test') {
  secureToMoveDelay = 10;
}

export const garageSecureToMoveDelay = secureToMoveDelay;

let interDistanceMeasurementDelay = 5000;
if (process.env.NODE_ENV === 'test') {
  interDistanceMeasurementDelay = 10;
}

export const garageInterDistanceMeasurementDelay = interDistanceMeasurementDelay;
