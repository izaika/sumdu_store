import { combineReducers } from 'redux';

import auth from './auth';
import cart from './cart';
import users from './users';
import orders from './orders';
import process from './process';
import products from './products';
import categories from './categories';

export default combineReducers({
  categories,
  products,
  process,
  orders,
  users,
  cart,
  auth
});
