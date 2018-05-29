import React, { Component, Fragment } from 'react';

import Styles from './app.scss';

import Header from '../../components/Header';

import '../../../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-css-only/css/bootstrap-theme.min.css';

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div className={Styles.app}>
        <Header />
      </div>
    );
  }
}

export default App;
