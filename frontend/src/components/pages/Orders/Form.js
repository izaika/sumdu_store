import axios from 'axios';
import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';

import routes from '../../../shared/routes';
import { addProduct, updateProduct } from '../../../store/actions/products';
import { startProcess, stopProcess } from '../../../store/actions/process';

class FormComponent extends Component {
  static propTypes = { isLoggedIn: PropTypes.bool.isRequired };

  state = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    comment: '',
    status: 0,
    totalPrice: 0,
    products: [],
    createdAt: ''
  };

  setStatus = status => this.setState({ status });
  backToOrders = () => this.props.history.push(routes.orders);

  componentDidMount() {
    if (this.props.isLoggedIn) this.getOrderData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) this.getOrderData();
  }

  getOrderData = () => {
    const { props } = this;
    axios({
      method: 'get',
      url: `orders/${props.match.params.id}`
    })
      .then(response => {
        const { id, name, email, phone, comment, status, totalPrice, products, createdAt } = response.data.order;
        this.setState({ id, name, email, phone, comment, status, totalPrice, products, createdAt });
      })
      .catch(error => {
        console.log(error);
        alertify.error('Cannot get product data. Please try again later.');
      });
  };

  onSubmit = event => {
    event.preventDefault();
    props.updateProduct(props.history, props.match.params.id, this.state.status);
  };

  render() {
    return (
      <Fragment>
        <Col smOffset={2} sm={10}>
          <h2>Edit Order</h2>
        </Col>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="orderName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={3}>
              <FormControl value={this.state.name} disabled />
            </Col>
          </FormGroup>
          <FormGroup controlId="orderEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={3}>
              <FormControl type="email" value={this.state.email} disabled />
            </Col>
          </FormGroup>
          <FormGroup controlId="orderPhone">
            <Col componentClass={ControlLabel} sm={2}>
              Phone
            </Col>
            <Col sm={3}>
              <FormControl type="tel" value={this.state.phone} disabled />
            </Col>
          </FormGroup>
          <FormGroup controlId="orderComment">
            <Col componentClass={ControlLabel} sm={2}>
              Comment
            </Col>
            <Col sm={3}>
              <FormControl componentClass="textarea" value={this.state.phone} disabled />
            </Col>
          </FormGroup>
          <FormGroup controlId="orderPrice">
            <Col componentClass={ControlLabel} sm={2}>
              Total Price
            </Col>
            <Col sm={3}>
              <FormControl type="number" value={this.state.totalPrice} disabled />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={3}>
              <ButtonToolbar>
                {this.state.id > 0 && (
                  <Button type="submit" bsStyle="primary">
                    Save
                  </Button>
                )}
                <Button type="button" bsStyle="default" onClick={this.backToOrders}>
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
    { addProduct, updateProduct, startProcess, stopProcess }
  )(FormComponent)
);
