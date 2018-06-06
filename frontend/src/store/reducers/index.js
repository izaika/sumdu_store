import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import process from './process';
import products from './products';
import categories from './categories';

export default combineReducers({
  categories,
  products,
  process,
  users,
  auth
});
