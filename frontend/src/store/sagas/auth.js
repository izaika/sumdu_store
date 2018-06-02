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
    yield put(saveToken(response.data.api_key));
  } catch (error) {}
  yield put(stopProcess(actionTypes.AUTH_LOG_IN));
}
