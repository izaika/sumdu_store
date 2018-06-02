import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { logInSaga } from './auth';

export function* watchSagas() {
  yield all([takeEvery(actionTypes.AUTH_LOG_IN, logInSaga)]);
}
