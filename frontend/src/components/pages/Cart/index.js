import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Col,
  ControlLabel,
  Row,
  Clearfix
} from 'react-bootstrap';

import { addOrder } from '../../../store/actions/orders';
import { getProducts } from '../../../store/actions/products';
import { removeProductFromCart, clearCart } from '../../../store/actions/cart';

import Content from '../../Content';

class Cart extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    comment: ''
  };

  setName = name => this.setState({ name });
  setEmail = email => this.setState({ email });
  setPhone = phone => this.setState({ phone });
  setComment = comment => this.setState({ comment });

  componentDidMount() {
    this.props.getProducts();
  }

  getProductsObjects = () => this.props.products.filter(product => this.props.cartProductsIds.includes(product.id));
  calculateTotalPrice = () => {
    let price = 0;
    this.getProductsObjects().forEach(product => (price += product.price));

    return price;
  };

  onSubmit = event => {
    event.preventDefault();
    const { history, cartProductsIds } = this.props;
    const { name, email, phone, comment } = this.state;
    this.props.addOrder(history, name, email, phone, comment, cartProductsIds);
  };

  render() {
    const { props } = this;
    const { cartProductsIds, products } = props;

    return (
      <Content title="Cart">
        {!!cartProductsIds.length ? (
          products.length && (
            <Fragment>
              <h3>Here is your order:</h3>
              <Table striped hover>
                <colgroup>
                  <col />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '100px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getProductsObjects().map(product => {
                    return (
                      <tr key={`product${product.id}`}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                          <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            onClick={() => props.removeProductFromCart(product.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="pull-right">
                <strong>Total Price: {this.calculateTotalPrice()}</strong>
              </div>
              <Clearfix />
              <hr />
              <Row>
                <Form horizontal onSubmit={this.onSubmit}>
                  <FormGroup controlId="cartName">
                    <Col componentClass={ControlLabel} sm={8}>
                      Name
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        type="text"
                        placeholder="Name"
                        required
                        value={this.state.name}
                        onChange={event => this.setName(event.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="cartEmail">
                    <Col componentClass={ControlLabel} sm={8}>
                      E-mail
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        type="email"
                        placeholder="E-mail"
                        required
                        value={this.state.email}
                        onChange={event => this.setEmail(event.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="cartPhone">
                    <Col componentClass={ControlLabel} sm={8}>
                      Phone:
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        type="tel"
                        placeholder="Phone"
                        required
                        value={this.state.phone}
                        onChange={event => this.setPhone(event.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="cartComment">
                    <Col componentClass={ControlLabel} sm={8}>
                      Comment
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        componentClass="textarea"
                        placeholder="Comment"
                        value={this.state.comment}
                        onChange={event => this.setComment(event.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={8} sm={4}>
                      <ButtonToolbar>
                        <Button type="submit" bsStyle="primary">
                          Confirm Order
                        </Button>
                        <Button bsStyle="danger" onClick={props.clearCart}>
                          Clear Cart
                        </Button>
                      </ButtonToolbar>
                    </Col>
                  </FormGroup>
                </Form>
              </Row>
            </Fragment>
          )
        ) : (
          <p>You don't have any products in your cart yet...</p>
        )}
      </Content>
    );
  }
}

export default connect(
  reduxState => ({ cartProductsIds: reduxState.cart, products: reduxState.products }),
  { getProducts, removeProductFromCart, clearCart, addOrder }
)(Cart);
