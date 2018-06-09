import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav } from 'react-bootstrap';

import { logOut } from '../../../store/actions/auth';
import NavItem from './NavItem';
import routes from '../../../shared/routes';

const Navigation = props => (
  <Nav pullRight>
    {props.isLoggedIn ? (
      <Fragment>
        <NavItem to={routes.orders}>Orders</NavItem>
        <NavItem to={routes.categories}>Categories</NavItem>
        <NavItem to={routes.productsAdmin}>Products</NavItem>
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
      <Fragment>
        <NavItem to={routes.home}>Home</NavItem>
        <NavItem to={routes.products}>Products</NavItem>
        <NavItem to={routes.cart}>{`Cart (${props.cartProductsAmount})`}</NavItem>
        <NavItem to={routes.logIn}>Log In</NavItem>
      </Fragment>
    )}
  </Nav>
);

export default withRouter(
  connect(
    reduxState => ({ isLoggedIn: !!reduxState.auth.token, cartProductsAmount: reduxState.cart.length }),
    { logOut }
  )(Navigation)
);
