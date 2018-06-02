import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
        <NavItem to={routes.users}>Users</NavItem>
        <li role="presentation">
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              props.logOut();
              props.history.push(routes.home);
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

export default withRouter(connect(reduxState => ({ isLoggedIn: !!reduxState.auth.token }), { logOut })(Navigation));
