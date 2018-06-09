import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import routes from '../../shared/routes';
import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setOrders, getOrders } from '../actions/orders';
import { clearCart } from '../actions/cart';

export function* getOrdersSaga() {
  yield put(startProcess(actionTypes.GET_ORDERS));
  try {
    const response = yield axios({ method: 'get', url: 'orders' });
    yield put(setOrders(response.data.orders));
  } catch (error) {
    alertify.error('Cannot get orders. Please try again later.');
  }
  yield put(stopProcess(actionTypes.GET_ORDERS));
}

export function* addOrderSaga(action) {
  yield put(startProcess(actionTypes.ADD_ORDER));
  const { history, name, email, phone, comment, products } = action;
  try {
    const response = yield axios({
      method: 'post',
      url: 'orders',
      data: { name, email, phone, comment, productIds: products }
    });
    yield put(clearCart());
    history.push(routes.products);
    alertify.success(response.data.message);
  } catch (error) {
    alertify.error('Cannot save product. Please try again later.');
  }
  yield put(stopProcess(actionTypes.ADD_ORDER));
}

export function* updateOrderSaga(action) {
  yield put(startProcess(actionTypes.UPDATE_ORDER));
  const { history, id, status } = action;
  try {
    const response = yield axios({
      method: 'put',
      url: `orders/${id}`,
      data: { status }
    });
    yield put(getOrders());
    history.push(routes.orders);
    alertify.success(`Status has been updated.`);
  } catch (error) {
    alertify.error('Cannot update order. Please try again later.');
  }
  yield put(stopProcess(actionTypes.UPDATE_ORDER));
}

export function* deleteOrderSaga(action) {
  yield put(startProcess(actionTypes.DELETE_ORDER));
  try {
    yield axios({
      method: 'delete',
      url: `orders/${action.id}`
    });
    alertify.success(`Order has been deleted.`);
    yield put(getOrders());
  } catch (error) {
    alertify.error('Cannot delete order. Please try again later.');
  }
  yield put(stopProcess(actionTypes.DELETE_ORDER));
}
