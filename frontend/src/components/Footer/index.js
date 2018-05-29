import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Styles from './footer.scss';

const Footer = () => (
  <footer className={Styles.footer}>
    <Grid>
      <Row>
        <Col xs={12}>
          <p>TechMarket &copy; 2018 All rights reserved</p>
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;
