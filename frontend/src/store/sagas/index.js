import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { logInSaga, logOutSaga } from './auth';
import { getUsersSaga } from './users';

export function* watchSagas() {
  yield all([
    takeEvery(actionTypes.LOG_IN, logInSaga),
    takeEvery(actionTypes.LOG_OUT, logOutSaga),

    takeEvery(actionTypes.GET_USERS, getUsersSaga)
  ]);
}
