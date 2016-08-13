import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { unsecureAndOpenDoor, closeAndSecureDoor } from '../actions';
import StateChangeButton from '../components/stateChangeButton.jsx';

const mapStateToProps = (state) => {
  return {
    doorState: state.door.position,
    secureState: state.secure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unsecureAndOpenDoor: bindActionCreators(unsecureAndOpenDoor, dispatch),
    closeAndSecureDoor: bindActionCreators(closeAndSecureDoor, dispatch),
  };
};

const CurrentStateChangeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateChangeButton);

export default CurrentStateChangeButton;
