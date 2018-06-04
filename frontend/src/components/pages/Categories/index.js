import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getCategories, deleteCategory } from '../../../store/actions/categories';
import { sortByTitle } from '../../../shared/utils';
import routes from '../../../shared/routes';
import Content from '../../Content';

import Grid from './Grid';
import Form from './Form';

class Categories extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) this.props.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getCategories();
    }
  }

  openNestedRoute = route => {
    const { match, history } = this.props;
    history.push(`${match.path}/${route}`);
  };

  deleteCategoryHandler = (id, title) => {
    alertify.confirm(`Are you sure to delete category ${title}?`, () => this.props.deleteCategory(id));
  };

  render() {
    const { categories, match, isLoggedIn } = this.props;
    return (
      <Content title="Categories">
        <Switch>
          <Route
            path={match.path}
            exact
            render={() => (
              <Grid
                categories={sortByTitle(categories)}
                openNestedRoute={this.openNestedRoute}
                deleteCategory={this.deleteCategoryHandler}
              />
            )}
          />
          <Route path={`${match.path}/new`} render={() => <Form isNew isLoggedIn={isLoggedIn} />} />
          <Route path={`${match.path}/:id/edit`} render={() => <Form isLoggedIn={isLoggedIn} />} />
        </Switch>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({
    isLoggedIn: !!reduxState.auth.token,
    categories: reduxState.categories
  }),
  {
    getCategories,
    deleteCategory
  }
)(Categories);
