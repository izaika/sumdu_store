import axios from 'axios';
import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ButtonToolbar, ControlLabel, Clearfix } from 'react-bootstrap';

import * as actionTypes from '../../../store/actions/types';
import routes from '../../../shared/routes';
import { addCategory, updateCategory } from '../../../store/actions/categories';
import { startProcess, stopProcess } from '../../../store/actions/process';

class FormComponent extends Component {
  static propTypes = { isNew: PropTypes.bool, isLoggedIn: PropTypes.bool.isRequired };
  static defaultTypes = { isNew: false };

  state = { title: '' };

  setTitle = title => this.setState({ title });
  backToCategories = () => this.props.history.push(routes.categories);

  componentDidMount() {
    const { props } = this;
    if (props.isLoggedIn && !props.isNew) this.getCategoryData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (!prevProps.isLoggedIn && this.props.isLoggedIn && !props.isNew) this.getCategoryData();
  }

  getCategoryData = () => {
    const { props } = this;
    axios({
      method: 'get',
      url: `categories/${props.match.params.id}`
    })
      .then(response => {
        const { title } = response.data.category;
        this.setState({ title });
      })
      .catch(error => {
        alertify.error('Cannot get category data. Please try again later.');
      });
  };

  onSubmit = event => {
    event.preventDefault();
    const { props, state } = this;
    if (props.isNew) {
      props.addCategory(props.history, state.title);
    } else {
      props.updateCategory(props.history, props.match.params.id, state.title);
    }
  };

  render() {
    return (
      <Fragment>
        <Col smOffset={2} sm={10}>
          <h2>{this.props.isNew ? 'Add Category' : 'Edit Category'}</h2>
        </Col>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={3}>
              <FormControl
                type="text"
                placeholder="Title"
                required
                value={this.state.title}
                onChange={event => this.setTitle(event.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={3}>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary">
                  Save
                </Button>
                <Button type="button" bsStyle="default" onClick={this.backToCategories}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    { addCategory, updateCategory, startProcess, stopProcess }
  )(FormComponent)
);
