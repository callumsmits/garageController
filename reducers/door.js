const door = (state = 'CLOSED', action) => {
  switch (action.type) {
    case 'OPEN_DOOR':
      if ((state === 'CLOSED') || (state === 'CLOSING')) {
        return 'OPENING';
      }
      return state;
    default:
      return state;
  }
};

export default door;
