import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

const Grid = props => (
  <Fragment>
    <Button bsStyle="primary" onClick={() => props.openNestedRoute('new')}>
      Add New
    </Button>
    <Table striped hover>
      <colgroup>
        <col />
        <col />
        <col />
        <col style={{ width: '101px' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Last Modified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(({ email, name, updatedAt, id }) => (
          <tr key={email}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{updatedAt}</td>
            <td>
              <ButtonToolbar>
                <Button bsStyle="warning" bsSize="xsmall" onClick={() => props.openNestedRoute(`${id}/edit`)}>
                  Edit
                </Button>
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => props.deleteUser(id, name, email)}>
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  ),
  openNestedRoute: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default Grid;
