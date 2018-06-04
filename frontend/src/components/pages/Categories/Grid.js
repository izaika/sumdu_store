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
        <col style={{ width: '101px' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map(({ id, title }) => (
          <tr key={`category_${id}`}>
            <td>{title}</td>
            <td>
              <ButtonToolbar>
                <Button bsStyle="warning" bsSize="xsmall" onClick={() => props.openNestedRoute(`${id}/edit`)}>
                  Edit
                </Button>
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => props.deleteCategory(id, title)}>
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  openNestedRoute: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

export default Grid;
