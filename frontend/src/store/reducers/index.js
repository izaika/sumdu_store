import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import process from './process';

export default combineReducers({
  process,
  users,
  auth
});
