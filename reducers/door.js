const door = (state = 'CLOSED', action) => {
  switch (action.type) {
    case 'OPEN_DOOR':
      return 'OPENING';
    default:
      return state;
  }
};

export default door;
