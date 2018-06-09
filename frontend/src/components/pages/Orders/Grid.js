import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

const Grid = props => (
  <Table striped hover>
    <colgroup>
      <col />
      <col />
      <col />
      <col />
      <col />
      <col />
      <col />
      <col style={{ width: '110px' }} />
    </colgroup>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>E-mail</th>
        <th>Phone</th>
        <th>Total Price</th>
        <th>Status</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.orders.map(({ id, name, email, phone, totalPrice, status, createdAt }) => (
        <tr key={`product_${id}`}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{totalPrice}</td>
          <td>{props.getStatusText(status)}</td>
          <td>{createdAt}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="success" bsSize="xsmall" onClick={() => props.openNestedRoute(`${id}/edit`)}>
                Open
              </Button>
              <Button bsStyle="danger" bsSize="xsmall" onClick={() => props.deleteOrder(id)}>
                Delete
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

Grid.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      comment: PropTypes.string,
      status: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        })
      )
    })
  ).isRequired,
  openNestedRoute: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  getStatusText: PropTypes.func.isRequired
};

export default Grid;
