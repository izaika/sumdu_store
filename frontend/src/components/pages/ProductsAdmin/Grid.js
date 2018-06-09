import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ButtonToolbar, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class Grid extends Component {
  state = {
    selectedCategoryId: 0
  };

  setSelectedCategoryId = id => this.setState({ selectedCategoryId: parseInt(id, 10) });

  getFilteredProducts = () =>
    this.state.selectedCategoryId === 0
      ? this.props.products
      : this.props.products.filter(product => product.categoryId === this.state.selectedCategoryId);

  render() {
    const { state, props } = this;
    return (
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
              value={state.selectedCategoryId}
              onChange={event => this.setSelectedCategoryId(event.target.value)}
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
            {this.getFilteredProducts().map(({ id, title, price, categoryId }) => (
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
  }
}

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
  deleteProduct: PropTypes.func.isRequired
};

export default Grid;
