import alertify from 'alertify.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getOrders, deleteOrder } from '../../../store/actions/orders';

import Content from '../../Content';

import Grid from './Grid';
import Form from './Form';

class Orders extends Component {
  state = {
    filterByStatusId: -1
  };

  setFilterByStatusId = id => this.setState({ filterByStatusId: parseInt(id, 10) });

  getFilteredOrders = () =>
    this.state.filterByStatusId === -1
      ? this.props.orders
      : this.props.orders.filter(order => order.status === this.state.filterByStatusId);

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

  getStatusText = id => {
    switch (id) {
      case -1:
        return 'All';
      case 0:
        return 'New';
      case 1:
        return 'In progress';
      case 2:
        return 'Closed';
    }
  };

  render() {
    const { orders, match, isLoggedIn } = this.props;
    return (
      <Content title="Orders">
        <Switch>
          {!!orders.length && (
            <Route
              path={match.path}
              exact
              render={() => (
                <Grid
                  orders={this.getFilteredOrders()}
                  getStatusText={this.getStatusText}
                  openNestedRoute={this.openNestedRoute}
                  deleteOrder={this.deleteOrderHandler}
                  filterByStatusId={this.state.filterByStatusId}
                  setFilterByStatusId={this.setFilterByStatusId}
                />
              )}
            />
          )}
          <Route
            path={`${match.path}/:id/edit`}
            render={() => <Form orders={orders} isLoggedIn={isLoggedIn} getStatusText={this.getStatusText} />}
          />
        </Switch>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({ isLoggedIn: !!reduxState.auth.token, orders: reduxState.orders }),
  { getOrders, deleteOrder }
)(Orders);
