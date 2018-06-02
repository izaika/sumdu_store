import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { logInSaga, logOutSaga } from './auth';

export function* watchSagas() {
  yield all([takeEvery(actionTypes.AUTH_LOG_IN, logInSaga), takeEvery(actionTypes.AUTH_LOG_OUT, logOutSaga)]);
}
