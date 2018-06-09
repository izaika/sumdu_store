import { List } from 'immutable';
import uniq from 'lodash/uniq';

import * as types from '../actions/types';
import config from '../../shared/config';

const lsKey = `${config.app_key}_cartProducts`;
let newState = [];

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_CART_PRODUCTS:
      return action.products;

    case types.ADD_PRODUCT_TO_CART:
      newState = uniq(
        List(state)
          .push(action.productId)
          .toArray()
      );
      localStorage.setItem(lsKey, newState);
      return newState;

    case types.REMOVE_PRODUCT_FROM_CART:
      newState = state.filter(item => item !== action.productId);
      localStorage.setItem(lsKey, newState);
      return newState;

    default:
      return state;
  }
};

export default reducer;
