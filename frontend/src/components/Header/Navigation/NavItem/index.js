import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Styles from './NavItem.scss';

const NavItem = props => {
  let isActive = false;

  if (props.to === '/') {
    isActive = props.pathname === props.to;
  } else {
    isActive = props.pathname.startsWith(props.to);
  }

  return (
    <li role="presentation" className={isActive ? 'active' : null}>
      <NavLink exact={props.exact} to={props.to} activeClassName={''}>
        {props.children}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  children: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  to: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  exact: false
};

export default connect((state, ownProps) => ({
  pathname: state.router.location.pathname
}))(NavItem);
