import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { getUsers } from '../../../store/actions/users';
import routes from '../../../shared/routes';
import Content from '../../Content';

class Users extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) this.props.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getUsers();
    }
  }

  render() {
    const { users } = this.props;
    return (
      <Content title="Users">
        {!!users.length && (
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Content>
    );
  }
}

export default connect(reduxState => ({ isLoggedIn: !!reduxState.auth.token, users: reduxState.users }), { getUsers })(
  Users
);
