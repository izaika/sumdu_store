import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ButtonToolbar, FormControl, FormGroup, Col, ControlLabel, Clearfix } from 'react-bootstrap';

const Grid = props => (
  <Fragment>
    <Button bsStyle="primary" onClick={() => props.openNestedRoute('new')}>
      Add New
    </Button>
    <hr />
    <FormGroup controlId="categories_filter">
      <Col componentClass={ControlLabel} sm={2}>
        Filter by category:
      </Col>
      <Col sm={3}>
        <FormControl
          componentClass="select"
          required
          value={props.filterByCategoryId}
          onChange={event => props.setFilterByCategoryId(event.target.value)}
          style={{ display: 'inline-block', width: '200px', marginLeft: '5px' }}
        >
          <option value={0}>All</option>
          {props.categories.map(category => (
            <option key={`category${category.id}`} value={category.id}>
              {category.title}
            </option>
          ))}
        </FormControl>
      </Col>
    </FormGroup>
    <Clearfix />
    <hr />
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
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      categoryId: PropTypes.number.isRequired
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  openNestedRoute: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  setFilterByCategoryId: PropTypes.func.isRequired,
  filterByCategoryId: PropTypes.number.isRequired
};

export default Grid;
