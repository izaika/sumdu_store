import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import process from './process';
import categories from './categories';

export default combineReducers({
  categories,
  process,
  users,
  auth
});
