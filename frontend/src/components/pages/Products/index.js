import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { getProducts } from '../../../store/actions/products';
import { getCategories } from '../../../store/actions/categories';

import Styles from './products.scss';
import Content from '../../Content';

class Products extends Component {
  state = {
    filterByCategoryId: 0
  };

  setFilterByCategoryId = id => this.setState({ filterByCategoryId: parseInt(id, 10) });

  getFilteredProducts = () =>
    this.state.filterByCategoryId === 0
      ? this.props.products
      : this.props.products.filter(product => product.categoryId === this.state.filterByCategoryId);

  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }

  render() {
    const { props, state } = this;
    console.log(state);
    return (
      <Content title="Products">
        <Row>
          <Col xs={3}>
            <h3>Filter by category:</h3>
            <ul className={Styles.categoriesUl}>
              <li>
                <input
                  id="categoryFilter0"
                  type="radio"
                  name="categoryFilter"
                  value={0}
                  checked={state.filterByCategoryId === 0}
                  onChange={event => this.setFilterByCategoryId(event.target.value)}
                />&nbsp;
                <label htmlFor="categoryFilter0">All</label>
              </li>
              {props.categories.map(category => {
                const key = `categoryFilter${category.id}`;
                return (
                  <li key={key}>
                    <input
                      id={key}
                      type="radio"
                      name="categoryFilter"
                      value={category.id}
                      checked={state.filterByCategoryId === category.id}
                      onChange={event => this.setFilterByCategoryId(event.target.value)}
                    />&nbsp;
                    <label htmlFor={key}>{category.title}</label>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={12}>
                <h3>Products:</h3>
              </Col>
              {this.getFilteredProducts().map(product => (
                <Col key={`product${product.id}`} xs={4}>
                  <h4>
                    <div className={Styles.imageWrap}>
                      <div className={Styles.image} style={{backgroundImage: `url(${imgPath}/${product.id}/image.jpg)`}} />
                    </div>
                    {product.title} <strong>${product.price}</strong>
                  </h4>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({
    products: reduxState.products,
    categories: reduxState.categories
  }),
  { getProducts, getCategories }
)(Products);
