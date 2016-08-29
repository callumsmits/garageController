export const closedDistanceThreshold = 100; // cm

export const garageDeviceAddress = 'http://garage.local';

export const garageDoorStateURL = '/doorState';

export const garageSecureStateURL = '/secureState';

export const garageDistanceURL = '/distance';

export const garageSecureTurnOnDelay = (process.env.NODE_ENV === 'test') ? 10 : 3000;

export const garageDoorMovementDelay = (process.env.NODE_ENV === 'test') ? 30 : 17000;

export const garageSecureToMoveDelay = (process.env.NODE_ENV === 'test') ? 10 : 1000;

export const garageInterDistanceMeasurementDelay = (process.env.NODE_ENV === 'test') ? 10 : 5000;

export const acceptableTimeLimitForInitialRequest = (process.env.NODE_ENV === 'test') ? 50 : 10000;

export const demoDelay = 10;
