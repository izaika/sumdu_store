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
        <col style={{ width: '200px' }} />
        <col />
        <col />
        <col style={{ width: '101px' }} />
        <col style={{ width: '101px' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(({ id, title, price, categoryId }) => (
          <tr key={`product_${id}`}>
            <td>
              <img src={`${imgPath}/${id}/image.jpg`} width={200} alt={title} />
            </td>
            <td>{title}</td>
            <td>{props.categories.find(category => category.id === categoryId).title}</td>
            <td>{price}</td>
            <td>
              <ButtonToolbar>
                <Button bsStyle="warning" bsSize="xsmall" onClick={() => props.openNestedRoute(`${id}/edit`)}>
                  Edit
                </Button>
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => props.deleteProduct(id, title)}>
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  openNestedRoute: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default Grid;
