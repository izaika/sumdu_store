import { combineReducers } from 'redux';

import auth from './auth';
import process from './process';

export default combineReducers({
  process,
  auth
});
