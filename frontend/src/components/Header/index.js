import React from 'react';
import { Navbar } from 'react-bootstrap';

const { Header, Brand } = Navbar;

import Styles from './header.scss';
import Navigation from './Navigation';

const LogoSVG = require('../../assets/logo.svg');

const HeaderComponent = () => (
  <header>
    <Navbar>
      <Header>
        <Brand>
          <LogoSVG className={Styles.logo} />
        </Brand>
      </Header>
      <Navigation />
    </Navbar>
  </header>
);

export default HeaderComponent;
