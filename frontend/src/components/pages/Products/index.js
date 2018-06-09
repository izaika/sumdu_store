import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { sortByTitle } from '../../../shared/utils';

import { getProducts } from '../../../store/actions/products';
import { getCategories } from '../../../store/actions/categories';
import { addProductToCart } from '../../../store/actions/cart';

import Content from '../../Content';
import Overview from './Overview';
import Product from './Product';

class Products extends Component {
  state = {
    filterByCategoryId: 0
  };

  setFilterByCategoryId = id => this.setState({ filterByCategoryId: parseInt(id, 10) });

  getFilteredProducts = () =>
    sortByTitle(
      this.state.filterByCategoryId === 0
        ? this.props.products
        : this.props.products.filter(product => product.categoryId === this.state.filterByCategoryId)
    );

  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }

  render() {
    const { props, state } = this;
    const { match, products, categories } = props;

    return (
      <Content title="Products">
        {products &&
          categories && (
            <Switch>
              <Route
                path={match.path}
                exact
                render={() => (
                  <Overview
                    products={sortByTitle(products)}
                    getFilteredProducts={this.getFilteredProducts}
                    categories={categories}
                    filterByCategoryId={state.filterByCategoryId}
                    setFilterByCategoryId={this.setFilterByCategoryId}
                  />
                )}
              />
              <Route
                path={`${match.path}/:id`}
                render={() => <Product products={products} addProductToCart={props.addProductToCart} />}
              />
            </Switch>
          )}
      </Content>
    );
  }
}

export default connect(
  reduxState => ({
    products: reduxState.products,
    categories: reduxState.categories
  }),
  { getProducts, getCategories, addProductToCart }
)(Products);
