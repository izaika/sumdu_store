import alertify from 'alertify.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getProducts, deleteProduct } from '../../../store/actions/products';
import { getCategories } from '../../../store/actions/categories';
import { sortByTitle } from '../../../shared/utils';
import Content from '../../Content';

import Grid from './Grid';
import Form from './Form';

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
    if (this.props.isLoggedIn) {
      this.props.getCategories();
      this.props.getProducts();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getCategories();
      this.props.getProducts();
    }
  }

  openNestedRoute = route => {
    const { match, history } = this.props;
    history.push(`${match.path}/${route}`);
  };

  deleteProductHandler = (id, title) => {
    alertify.confirm(`Are you sure to delete product ${title}?`, () => this.props.deleteProduct(id));
  };

  render() {
    const { products, categories, match, isLoggedIn } = this.props;
    return (
      <Content title="Products">
        <Switch>
          <Route
            path={match.path}
            exact
            render={() => (
              <Grid
                products={sortByTitle(this.getFilteredProducts(products))}
                categories={sortByTitle(categories)}
                openNestedRoute={this.openNestedRoute}
                deleteProduct={this.deleteProductHandler}
                filterByCategoryId={this.state.filterByCategoryId}
                setFilterByCategoryId={this.setFilterByCategoryId}
              />
            )}
          />
          <Route
            path={`${match.path}/new`}
            render={() => <Form categories={categories} isNew isLoggedIn={isLoggedIn} />}
          />
          <Route
            path={`${match.path}/:id/edit`}
            render={() => <Form categories={categories} isLoggedIn={isLoggedIn} />}
          />
        </Switch>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({
    isLoggedIn: !!reduxState.auth.token,
    products: reduxState.products,
    categories: reduxState.categories
  }),
  {
    getProducts,
    getCategories,
    deleteProduct
  }
)(Products);
