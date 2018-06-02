import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import Styles from './loader.scss';

const Loader = ({ isShown }) => (
  <CSSTransition
    in={isShown}
    timeout={700}
    mountOnEnter
    unmountOnExit
    classNames={{
      enter: null,
      enterActive: Styles.shown,
      exit: null,
      exitActive: Styles.hidden
    }}
  >
    <div className={Styles.skCubeGrid}>
      <div className={`${Styles.skCube} ${Styles.skCube1}`} />
      <div className={`${Styles.skCube} ${Styles.skCube2}`} />
      <div className={`${Styles.skCube} ${Styles.skCube3}`} />
      <div className={`${Styles.skCube} ${Styles.skCube4}`} />
      <div className={`${Styles.skCube} ${Styles.skCube5}`} />
      <div className={`${Styles.skCube} ${Styles.skCube6}`} />
      <div className={`${Styles.skCube} ${Styles.skCube7}`} />
      <div className={`${Styles.skCube} ${Styles.skCube8}`} />
      <div className={`${Styles.skCube} ${Styles.skCube9}`} />
    </div>
  </CSSTransition>
);

Loader.propTypes = {
  isShown: PropTypes.bool.isRequired
};

export default Loader;
