import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';

import routes from '../../../shared/routes';
import { logIn } from '../../../store/actions/auth';
import Content from '../../Content';

class LogIn extends Component {
  state = {
    email: '',
    password: ''
  };

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.logIn(email, password);
  };

  render() {
    if (this.props.isLoggedIn) return <Redirect to={routes.orders} />;

    return (
      <Content title="Log In">
        <Form horizontal onSubmit={this.onSubmit}>
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
              <Button type="submit" bsStyle="primary">
                Log in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Content>
    );
  }
}

export default connect(
  reduxState => ({ isLoggedIn: !!reduxState.auth.token }),
  { logIn }
)(LogIn);
