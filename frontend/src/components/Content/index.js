import React from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Styles from './content.scss';

import routes from '../../shared/routes';

const Content = props => {
  const data = {};

  switch (props.pathname) {
    case routes.home:
      data.title = 'Home';
      break;
    case routes.products:
      data.title = 'Products';
      break;
    case routes.orders:
      data.title = 'Orders';
      break;
    case routes.logIn:
      data.title = 'Log In';
      break;
  }

  return (
    <Grid className={Styles.content}>
      <Row>
        <Col xs={12}>
          <PageHeader>{data.title}</PageHeader>
        </Col>
        <Col xs={12}>{props.children}</Col>
      </Row>
    </Grid>
  );
};

export default connect(state => ({ pathname: state.router.location.pathname }))(Content);
