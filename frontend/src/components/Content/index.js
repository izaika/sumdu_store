import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Styles from './content.scss';
import Loader from '../Loader';

const Content = props => (
  <Grid className={Styles.content}>
    <Row>
      <Col xs={12}>
        <PageHeader>{props.title}</PageHeader>
      </Col>
      <Col xs={12}>
        <Loader isShown={props.isLoading} />
        {!props.isLoading && props.children}
      </Col>
    </Row>
  </Grid>
);

Content.propTypes = {
  title: PropTypes.string.isRequired
};

export default connect(reduxState => ({ isLoading: !!reduxState.process.length }))(Content);
