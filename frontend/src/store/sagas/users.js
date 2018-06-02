import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setUsers } from '../actions/users';

export function* getUsersSaga(action) {
  yield put(startProcess(actionTypes.GET_USERS));
  try {
    const response = yield axios({ method: 'get', url: 'users' });
    yield put(setUsers(response.data.users));
  } catch (error) {
    alertify.error('Cannot get users. Please try again later.');
  }
  yield put(stopProcess(actionTypes.GET_USERS));
}
