import alertify from 'alertify.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getOrders, deleteOrder } from '../../../store/actions/orders';

import Content from '../../Content';

import Grid from './Grid';
import Form from './Form';

class Orders extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getOrders();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getOrders();
    }
  }

  openNestedRoute = route => {
    const { match, history } = this.props;
    history.push(`${match.path}/${route}`);
  };

  deleteOrderHandler = id => {
    alertify.confirm(`Are you sure to delete order with ID ${id}?`, () => this.props.deleteOrder(id));
  };

  render() {
    const { orders, match, isLoggedIn } = this.props;
    return (
      <Content title="Orders">
        <Switch>
          <Route
            path={match.path}
            exact
            render={() => (
              <Grid orders={orders} openNestedRoute={this.openNestedRoute} deleteOrder={this.deleteOrderHandler} />
            )}
          />
          <Route path={`${match.path}/:id/edit`} render={() => <Form orders={orders} isLoggedIn={isLoggedIn} />} />
        </Switch>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({ isLoggedIn: !!reduxState.auth.token, orders: reduxState.orders }),
  { getOrders, deleteOrder }
)(Orders);
