import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from '../css/demo.css';

const DemoIndicator = (demo) => {
  let text = '';
  if (demo.demo === true) {
    text = 'Demo mode';
  }
  const style = classNames({
    [`${styles.base}`]: true,
    [`${styles.fade}`]: true,
    [`${styles.fadein}`]: demo.demo,
  });
  return (
    <h2 className={style}>{text}</h2>
  );
};

DemoIndicator.propTypes = {
  demo: PropTypes.bool,
};

export default DemoIndicator;
