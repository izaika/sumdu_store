import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'react-bootstrap';

import NavItem from './NavItem';
import routes from '../../../shared/routes';

const Navigation = ({ isLoggedIn }) => (
  <Nav pullRight>
    <NavItem to={routes.home}>Home</NavItem>
    <NavItem to={routes.products}>Products</NavItem>
    {isLoggedIn ? (
      <Fragment>
        <NavItem to={routes.orders}>Orders</NavItem>
        <NavItem to={routes.logOut}>Log Out</NavItem>
      </Fragment>
    ) : (
      <NavItem to={routes.logIn}>Log In</NavItem>
    )}
  </Nav>
);

export default connect(reduxState => ({ isLoggedIn: !!reduxState.auth.token }))(Navigation);
