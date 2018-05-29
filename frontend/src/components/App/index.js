import React, { Component, Fragment } from 'react';

import Styles from './app.scss';

import Header from '../../components/Header';
import Content from '../../components/Content';
import Footer from '../../components/Footer';

import '../../../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-css-only/css/bootstrap-theme.min.css';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={Styles.app}>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
