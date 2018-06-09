import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ButtonToolbar, FormGroup, FormControl, Col, ControlLabel, Clearfix } from 'react-bootstrap';

const Grid = props => (
  <Fragment>
    <FormGroup controlId="status_filter">
      <Col componentClass={ControlLabel} sm={2}>
        Filter by status:
      </Col>
      <Col sm={3}>
        <FormControl
          componentClass="select"
          required
          value={props.filterByStatusId}
          onChange={event => props.setFilterByStatusId(event.target.value)}
          style={{ display: 'inline-block', width: '200px', marginLeft: '5px' }}
        >
          <option value={-1}>{props.getStatusText(-1)}</option>
          <option value={0}>{props.getStatusText(0)}</option>
          <option value={1}>{props.getStatusText(1)}</option>
          <option value={2}>{props.getStatusText(2)}</option>
        </FormControl>
      </Col>
    </FormGroup>
    <Clearfix />
    <hr />
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
            <td>${totalPrice}</td>
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
  </Fragment>
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
      createdAt: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        })
      )
    })
  ).isRequired,
  filterByStatusId: PropTypes.number.isRequired,
  openNestedRoute: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  getStatusText: PropTypes.func.isRequired,
  setFilterByStatusId: PropTypes.func.isRequired
};

export default Grid;
