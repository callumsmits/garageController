import React from 'react';

import Header from './header.jsx';
import CurrentStateDisplay from '../containers/currentStateDisplay.jsx';
import CurrentStateChangeButton from '../containers/currentStateChangeButton.jsx';
import CurrentDemoIndicator from '../containers/currentDemoIndicator.jsx';

const App = () => (
  <div>
    <CurrentDemoIndicator />
    <Header />
    <CurrentStateDisplay />
    <CurrentStateChangeButton />
  </div>
);

export default App;
