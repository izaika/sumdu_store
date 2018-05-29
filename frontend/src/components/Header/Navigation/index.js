import React from 'react';

import { Nav } from 'react-bootstrap';

import NavItem from './NavItem';
import routes from '../../../shared/routes';

const Navigation = () => (
  <Nav pullRight>
    <NavItem to={routes.home} exact>
      Home
    </NavItem>
    <NavItem to={routes.products}>Products</NavItem>
    <NavItem to={routes.orders}>Orders</NavItem>
    <NavItem to={routes.logIn}>Log In</NavItem>
  </Nav>
);

export default Navigation;
