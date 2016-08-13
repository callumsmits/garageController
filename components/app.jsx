import React from 'react';

import Header from './header.jsx';
import CurrentStateDisplay from '../containers/currentStateDisplay.jsx';
import CurrentStateChangeButton from '../containers/currentStateChangeButton.jsx';

const App = () => (
  <div>
    <Header />
    <CurrentStateDisplay />
    <CurrentStateChangeButton />
  </div>
);

export default App;
