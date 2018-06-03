import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ButtonToolbar, ControlLabel, Clearfix } from 'react-bootstrap';

import routes from '../../../shared/routes';
import { addUser } from '../../../store/actions/users';

class FormComponent extends Component {
  static propTypes = { isNew: PropTypes.bool };
  static defaultTypes = { isNew: false };

  state = { name: '', email: '', password: '' };

  setName = name => this.setState({ name });
  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  backToUsers = () => this.props.history.push(routes.users);

  componentDidMount() {
    const { props } = this;
    if (props.isNew) {
      // TODO: get user data
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { props, state } = this;
    if (props.isNew) {
      props.addUser(props.history, state.name, state.email, state.password);
    }
  };

  render() {
    return (
      <Fragment>
        <Col smOffset={2} sm={3}>
          <h2>{this.props.isNew ? 'Add User' : 'Edit User'}</h2>
        </Col>
        <Clearfix />
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={3}>
              <FormControl
                type="name"
                placeholder="Name"
                required
                value={this.state.name}
                onChange={event => this.setName(event.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={3}>
              <FormControl
                type="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={event => this.setEmail(event.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={3}>
              <FormControl
                type="password"
                placeholder="Password"
                required
                minLength={6}
                maxLength={16}
                value={this.state.password}
                onChange={event => this.setPassword(event.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={3}>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary">
                  Save
                </Button>
                <Button type="button" bsStyle="default" onClick={this.backToUsers}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(connect(null, { addUser })(FormComponent));
