import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import config from '../../shared/config';
import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setToken } from '../actions/auth';

export function* logInSaga(action) {
  const { email, password } = action;
  yield put(startProcess(actionTypes.AUTH_LOG_IN));
  try {
    const response = yield axios({
      method: 'post',
      url: 'auth/login',
      data: { email, password }
    });
    const token = response.data.api_key;
    localStorage.setItem(`${config.app_key}_token`, token);
    axios.defaults.headers = { Authorization: `bearer ${token}` };
    alertify.success('Successfully logged in.');
    yield put(setToken(token));
  } catch (error) {}
  yield put(stopProcess(actionTypes.AUTH_LOG_IN));
}

export function* logOutSaga(action) {
  yield put(startProcess(actionTypes.AUTH_LOG_OUT));
  try {
    const response = yield axios({
      method: 'post',
      url: 'auth/logout'
    });
    localStorage.removeItem(`${config.app_key}_token`);
    axios.defaults.headers = {};
  } catch (error) {}
  yield put(stopProcess(actionTypes.AUTH_LOG_OUT));
}
