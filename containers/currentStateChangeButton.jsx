import { connect } from 'react-redux';
import { unsecureAndOpenDoor, closeAndSecureDoor } from '../actions';
import StateChangeButton from '../components/stateChangeButton.jsx';

const mapStateToProps = (state) => {
  return {
    doorState: state.door.position,
    secureState: state.secure,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionToDispatch = unsecureAndOpenDoor;
  if (ownProps.door === 'Closed') {
    actionToDispatch = unsecureAndOpenDoor;
  } else if (ownProps.door === 'Open') {
    actionToDispatch = closeAndSecureDoor;
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
