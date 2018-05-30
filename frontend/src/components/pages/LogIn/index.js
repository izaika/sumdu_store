import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';

import Content from '../../Content';

class LogIn extends Component {
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Content title="Log In">
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={1}>
              Email
            </Col>
            <Col sm={3}>
              <FormControl type="email" placeholder="Email" required />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={1}>
              Password
            </Col>
            <Col sm={3}>
              <FormControl type="password" placeholder="Password" required minLength={6} maxLength={16} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={3}>
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

export default LogIn;
