const secure = (state = 'OFF', action) => {
  switch (action.type) {
    case 'UNSECURE_DOOR':
      if (state === 'OFF') {
        return 'TURNING_ON';
      }
      return state;
    case 'TURN_ON_TIMEOUT':
      if (state === 'TURNING_ON') {
        return 'ON';
      }
      return state;
    case 'SECURE_DOOR':
      return 'OFF';
    default:
      return state;
  }
};

export default secure;
