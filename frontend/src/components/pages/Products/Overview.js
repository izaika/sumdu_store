import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Styles from './products.scss';

const Overview = props => {
  return (
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
              checked={props.filterByCategoryId === 0}
              onChange={event => props.setFilterByCategoryId(event.target.value)}
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
                  checked={props.filterByCategoryId === category.id}
                  onChange={event => props.setFilterByCategoryId(event.target.value)}
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
          {props.getFilteredProducts().map(product => (
            <Col key={`product${product.id}`} xs={4}>
              <NavLink to={`/products/${product.id}`} className={Styles.product}>
                <div className={Styles.imageWrap}>
                  <div
                    className={Styles.image}
                    style={{ backgroundImage: `url(${imgPath}/${product.id}/image.jpg)` }}
                  />
                </div>
                <h4>
                  {product.title} <strong>${product.price}</strong>
                </h4>
              </NavLink>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

Overview.propTypes = {
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
  filterByCategoryId: PropTypes.number.isRequired,
  setFilterByCategoryId: PropTypes.func.isRequired,
  getFilteredProducts: PropTypes.func.isRequired
};

export default Overview;
