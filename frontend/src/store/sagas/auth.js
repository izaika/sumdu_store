import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { saveToken } from '../actions/auth';

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
    axios.defaults.headers = { Authorization: `bearer ${token}` };
    yield put(saveToken(token));
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
    console.log(response);
    axios.defaults.headers = {};
  } catch (error) {}
  yield put(stopProcess(actionTypes.AUTH_LOG_OUT));
}
