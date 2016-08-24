import { connect } from 'react-redux';
import DemoIndicator from '../components/demoIndicator.jsx';


const mapStateToProps = (state) => {
  return {
    demo: state.demo,
  };
};

const CurrentDemoIndicator = connect(
  mapStateToProps
)(DemoIndicator);

export default CurrentDemoIndicator;
