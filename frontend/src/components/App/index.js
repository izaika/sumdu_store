import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../shared/routes';

import Styles from './app.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Orders from '../pages/Orders';
import Products from '../pages/Products';

import '../../../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-css-only/css/bootstrap-theme.min.css';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={Styles.app}>
        <Header />
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.logIn} component={LogIn} />
          <Route path={routes.orders} component={Orders} />
          <Route path={routes.products} component={Products} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
