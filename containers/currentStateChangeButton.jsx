import { connect } from 'react-redux';
import { openDoor, closeDoor } from '../actions';
import StateChangeButton from '../components/stateChangeButton.jsx';

const mapStateToProps = (state) => {
  return {
    doorState: state.door.position,
    secureState: state.secure,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionToDispatch = openDoor;
  if (ownProps.door === 'Closed') {
    actionToDispatch = openDoor;
  } else if (ownProps.door === 'Open') {
    actionToDispatch = closeDoor;
  }
  return {
    onStateButtonClick: () => {
      dispatch(actionToDispatch());
    },
  };
};

const CurrentStateChangeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateChangeButton);

export default CurrentStateChangeButton;
