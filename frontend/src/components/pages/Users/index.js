import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getUsers } from '../../../store/actions/users';
import routes from '../../../shared/routes';
import Content from '../../Content';

import Grid from './Grid';
import Form from './Form';

class Users extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) this.props.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getUsers();
    }
  }

  openNestedRoute = route => {
    const { match, history } = this.props;
    history.push(`${match.path}/${route}`);
  };

  render() {
    const { users, match, isLoggedIn } = this.props;
    return (
      <Content title="Users">
        <Switch>
          <Route
            path={match.path}
            exact
            render={() => !!users.length && <Grid users={users} openNestedRoute={this.openNestedRoute} />}
          />
          <Route path={`${match.path}/new`} render={() => <Form isNew isLoggedIn={isLoggedIn} />} />
          <Route path={`${match.path}/:id/edit`} render={() => <Form isLoggedIn={isLoggedIn} />} />
        </Switch>
      </Content>
    );
  }
}

export default connect(reduxState => ({ isLoggedIn: !!reduxState.auth.token, users: reduxState.users }), { getUsers })(
  Users
);
