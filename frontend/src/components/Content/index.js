import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Styles from './content.scss';

const Content = props => (
  <Grid className={Styles.content}>
    <Row>
      <Col xs={12}>
        <PageHeader>{props.title}</PageHeader>
      </Col>
      <Col xs={12}>{props.children}</Col>
    </Row>
  </Grid>
);

Content.propTypes = {
  title: PropTypes.string.isRequired
};

export default Content;
