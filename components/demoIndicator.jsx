import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from '../css/demo.css';

const DemoIndicator = (demo) => {
  const text = (demo.demo === true) ? 'Demo mode' : '';
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
