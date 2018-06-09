import axios from 'axios';
import alertify from 'alertify.js';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, FormControl, FormGroup, Col, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';

import routes from '../../../shared/routes';
import { addProduct, updateProduct } from '../../../store/actions/products';
import { startProcess, stopProcess } from '../../../store/actions/process';

class FormComponent extends Component {
  static propTypes = { isNew: PropTypes.bool, isLoggedIn: PropTypes.bool.isRequired };
  static defaultTypes = { isNew: false };

  state = {
    categories: [],
    categoryId: 0,
    productId: null,
    title: '',
    description: '',
    price: 0,
    uploadedImage: null
  };

  setTitle = title => this.setState({ title });
  setDescription = description => this.setState({ description });
  setPrice = price => this.setState({ price });
  setCategoryId = categoryId => this.setState({ categoryId });
  backToProducts = () => this.props.history.push(routes.productsAdmin);

  componentDidMount() {
    const { props } = this;
    this.setState({ categories: props.categories });
    if (props.isLoggedIn) {
      if (!props.isNew) this.getProductData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (!prevProps.isLoggedIn && this.props.isLoggedIn && !props.isNew) this.getProductData();
  }

  getProductData = () => {
    const { props } = this;
    axios({
      method: 'get',
      url: `products/${props.match.params.id}`
    })
      .then(response => {
        const { title, description, price, categoryId } = response.data.product;
        this.setState({ title, description, price, categoryId });
      })
      .catch(error => {
        alertify.error('Cannot get product data. Please try again later.');
      });
  };

  onSubmit = event => {
    event.preventDefault();
    const { props, state } = this;
    const { title, description, price, categoryId, uploadedImage } = state;
    if (props.isNew) {
      props.addProduct(props.history, title, description, price, categoryId, uploadedImage);
    } else {
      props.updateProduct(props.history, props.match.params.id, title, description, price, categoryId, uploadedImage);
    }
  };

  onFileInputChange = event => this.setState({ uploadedImage: event.target.files[0] });

  render() {
    return (
      <Fragment>
        <Col smOffset={2} sm={10}>
          <h2>{this.props.isNew ? 'Add Product' : 'Edit Product'}</h2>
        </Col>
        {this.state.categories.length ? (
          <Form horizontal onSubmit={this.onSubmit}>
            <FormGroup controlId="formControlsFile">
              <Col componentClass={ControlLabel} sm={2}>
                Image
              </Col>
              <Col sm={3}>
                <input type="file" id="formControlsFile" onChange={this.onFileInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={3}>
                <FormControl
                  type="text"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={event => this.setTitle(event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalCategoryId">
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={3}>
                <FormControl
                  componentClass="select"
                  required
                  value={this.state.categoryId}
                  onChange={event => this.setCategoryId(event.target.value)}
                >
                  <option value={0} disabled />
                  {this.state.categories.map(category => (
                    <option key={`category${category.id}`} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDescription">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={3}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={event => this.setDescription(event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPrice">
              <Col componentClass={ControlLabel} sm={2}>
                Price
              </Col>
              <Col sm={3}>
                <FormControl
                  type="number"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={event => this.setPrice(event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={3}>
                <ButtonToolbar>
                  {this.state.categoryId > 0 &&
                    this.state.title.length > 0 &&
                    this.state.price > 0 && (
                      <Button type="submit" bsStyle="primary">
                        Save
                      </Button>
                    )}
                  <Button type="button" bsStyle="default" onClick={this.backToProducts}>
                    Cancel
                  </Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        ) : (
          'Add categories first'
        )}
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    { addProduct, updateProduct, startProcess, stopProcess }
  )(FormComponent)
);
