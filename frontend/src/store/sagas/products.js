import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import routes from '../../shared/routes';
import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setProducts, getProducts } from '../actions/products';

export function* getProductsSaga(action) {
  yield put(startProcess(actionTypes.GET_PRODUCTS));
  try {
    const response = yield axios({ method: 'get', url: 'products' });
    yield put(setProducts(response.data.products));
  } catch (error) {
    alertify.error('Cannot get products. Please try again later.');
  }
  yield put(stopProcess(actionTypes.GET_PRODUCTS));
}

export function* addProductSaga(action) {
  yield put(startProcess(actionTypes.ADD_PRODUCT));
  const { history, title, description, price, categoryId } = action;
  try {
    const response = yield axios({
      method: 'post',
      url: 'products',
      data: { title, description, price, categoryId }
    });
    yield put(getProducts());
    history.push(routes.productsAdmin);
    alertify.success(`Product ${title} has been added.`);
  } catch (error) {
    alertify.error('Cannot save product. Please try again later.');
  }
  yield put(stopProcess(actionTypes.ADD_PRODUCT));
}

export function* updateProductSaga(action) {
  yield put(startProcess(actionTypes.UPDATE_PRODUCT));
  const { history, id, title, description, price, categoryId } = action;
  try {
    const response = yield axios({
      method: 'put',
      url: `products/${id}`,
      data: { title, description, price, categoryId }
    });
    yield put(getProducts());
    history.push(routes.productsAdmin);
    alertify.success(`Product has been updated.`);
  } catch (error) {
    alertify.error('Cannot update product. Please try again later.');
  }
  yield put(stopProcess(actionTypes.UPDATE_PRODUCT));
}

export function* deleteProductSaga(action) {
  yield put(startProcess(actionTypes.DELETE_PRODUCT));
  const { id, title } = action;
  try {
    yield axios({
      method: 'delete',
      url: `products/${id}`
    });
    alertify.success(`Product ${title} has been deleted.`);
    yield put(getProducts());
  } catch (error) {
    alertify.error('Cannot delete product. Please try again later.');
  }
  yield put(stopProcess(actionTypes.DELETE_PRODUCT));
}
