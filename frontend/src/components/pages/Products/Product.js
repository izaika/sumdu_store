import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import Styles from './products.scss';

const Product = props => {
  if (props.products.length === 0) return null;

  const product = props.products.find(item => item.id === parseInt(props.match.params.id, 10));

  return (
    <Row>
      <Col xs={3}>
        <img className={Styles.bigImage} src={`${imgPath}/${product.id}/image.jpg`} alt={product.title} />
      </Col>
      <Col xs={9}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div>
          <span className={Styles.price}>${product.price}</span>&nbsp;
          <Button
            bsStyle="primary"
            onClick={() => {
              props.addProductToCart(product.id);
              props.history.push('/products');
            }}
          >
            Add to Cart
          </Button>
        </div>
      </Col>
    </Row>
  );
};

Product.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      categoryId: PropTypes.number.isRequired
    })
  ).isRequired,
  addProductToCart: PropTypes.func.isRequired
};

export default withRouter(Product);
