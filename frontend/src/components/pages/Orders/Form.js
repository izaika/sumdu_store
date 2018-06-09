import axios from 'axios';
import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';

import routes from '../../../shared/routes';
import { updateOrder } from '../../../store/actions/orders';
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
        alertify.error('Cannot get order data. Please try again later.');
      });
  };

  onSubmit = event => {
    const { props, state } = this;
    event.preventDefault();
    props.updateOrder(props.history, props.match.params.id, state.status);
  };

  render() {
    const { state, props } = this;
    return (
      <Fragment>
        <h2>Order Details</h2>
        <strong>Name: </strong> {state.name}
        <br />
        <strong>E-mail: </strong> {state.email}
        <br />
        <strong>Phone: </strong> {state.phone}
        <br />
        <strong>Comment: </strong>
        <p>{state.comment}</p>
        <strong>Total price: </strong> ${state.totalPrice}
        <br />
        <hr />
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="orderStatus">
            <Col componentClass={ControlLabel} sm={1}>
              Status
            </Col>
            <Col sm={3}>
              <FormControl
                componentClass="select"
                required
                value={this.state.status}
                onChange={event => this.setStatus(event.target.value)}
              >
                <option value={0}>{props.getStatusText(0)}</option>
                <option value={1}>{props.getStatusText(1)}</option>
                <option value={2}>{props.getStatusText(2)}</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={3}>
              <ButtonToolbar>
                {this.state.id > 0 && (
                  <Button type="submit" bsStyle="primary">
                    Save
                  </Button>
                )}
                <Button type="button" bsStyle="default" onClick={this.backToOrders}>
                  Back
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
    { updateOrder, startProcess, stopProcess }
  )(FormComponent)
);
