import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import config from '../../shared/config';
import routes from '../../shared/routes';
import { setToken, logOut } from '../../store/actions/auth';
import { getCartProducts } from '../../store/actions/cart';

import Styles from './app.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import ProductsAdmin from '../pages/ProductsAdmin';
import Users from '../pages/Users';
import Categories from '../pages/Categories';
import Cart from '../pages/Cart';

import '../../../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-css-only/css/bootstrap-theme.min.css';

class App extends Component {
  componentDidMount() {
    axios.interceptors.request.use(
      config => config,
      error => {
        console.error(error);
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.props.logOut();
        }
        console.error(error);
        return Promise.reject(error);
      }
    );

    const token = localStorage.getItem(`${config.app_key}_token`);
    const userId = parseInt(localStorage.getItem(`${config.app_key}_userId`), 10);
    if (token && userId) {
      axios.defaults.headers = { Authorization: `bearer ${token}` };
      this.props.setToken(token, userId);
    }
    this.props.getCartProducts();
  }

  render() {
    return (
      <div className={Styles.app}>
        <Header />
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.products} component={Products} />
          <Route path={routes.productsAdmin} component={ProductsAdmin} />
          <Route path={routes.orders} component={Orders} />
          <Route path={routes.users} component={Users} />
          <Route path={routes.categories} component={Categories} />
          <Route path={routes.logIn} component={LogIn} />
          <Route path={routes.cart} component={Cart} />
          <Redirect to={routes.home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    reduxState => ({ isLoggedIn: !!reduxState.auth.token }),
    { setToken, getCartProducts, logOut }
  )(App)
);
