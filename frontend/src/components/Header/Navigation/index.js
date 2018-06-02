import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'react-bootstrap';

import { logOut } from '../../../store/actions/auth';
import NavItem from './NavItem';
import routes from '../../../shared/routes';

const Navigation = props => (
  <Nav pullRight>
    <NavItem to={routes.home}>Home</NavItem>
    <NavItem to={routes.products}>Products</NavItem>
    {props.isLoggedIn ? (
      <Fragment>
        <NavItem to={routes.orders}>Orders</NavItem>
        <li role="presentation">
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              props.logOut();
            }}
          >
            Log Out
          </a>
        </li>
      </Fragment>
    ) : (
      <NavItem to={routes.logIn}>Log In</NavItem>
    )}
  </Nav>
);

export default connect(reduxState => ({ isLoggedIn: !!reduxState.auth.token }), { logOut })(Navigation);
