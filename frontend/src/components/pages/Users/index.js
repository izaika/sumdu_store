import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { getUsers, deleteUser } from '../../../store/actions/users';
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

  deleteUserHandler = (id, name, email) => {
    const { props } = this;
    if (props.users.length < 2) return alertify.error('Can not delete the last user.');
    if (props.loggedUserId === id) return alertify.error("You can't delete yourself.");

    alertify.confirm(`Are you sure to delete user ${name}<${email}>?`, () => props.deleteUser(id, name, email));
  };

  render() {
    const { users, match, isLoggedIn } = this.props;
    return (
      <Content title="Users">
        <Switch>
          <Route
            path={match.path}
            exact
            render={() =>
              !!users.length && (
                <Grid users={users} openNestedRoute={this.openNestedRoute} deleteUser={this.deleteUserHandler} />
              )
            }
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
    users: reduxState.users,
    loggedUserId: reduxState.auth.userId
  }),
  {
    getUsers,
    deleteUser
  }
)(Users);
