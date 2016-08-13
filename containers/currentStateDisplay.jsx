import { connect } from 'react-redux';
import StateDisplay from '../components/stateDisplay.jsx';


const mapStateToProps = (state) => {
  return {
    doorState: state.door.position,
    secureState: state.secure,
  };
};

const CurrentStateDisplay = connect(
  mapStateToProps
)(StateDisplay);

export default CurrentStateDisplay;
