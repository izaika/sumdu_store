import { put } from 'redux-saga/effects';

import { setCartProducts } from '../actions/cart';
import config from '../../shared/config';

const lsKey = `${config.app_key}_cartProducts`;

export function* getCartProductsSaga() {
  const cartProducts = localStorage.getItem(lsKey);
  if (cartProducts) yield put(setCartProducts(cartProducts.split(',').map(productId => parseInt(productId, 10))));
}

export function* clearCartSaga() {
  localStorage.removeItem(lsKey);
  yield put(setCartProducts([]));
}
