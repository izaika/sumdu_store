import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { logInSaga, logOutSaga } from './auth';
import { getUsersSaga, addUserSaga, updateUserSaga, deleteUserSaga } from './users';
import { getCategoriesSaga, addCategorySaga, updateCategorySaga, deleteCategorySaga } from './categories';

export function* watchSagas() {
  yield all([
    takeEvery(actionTypes.LOG_IN, logInSaga),
    takeEvery(actionTypes.LOG_OUT, logOutSaga),

    takeEvery(actionTypes.GET_USERS, getUsersSaga),
    takeEvery(actionTypes.ADD_USER, addUserSaga),
    takeEvery(actionTypes.UPDATE_USER, updateUserSaga),
    takeEvery(actionTypes.DELETE_USER, deleteUserSaga),

    takeEvery(actionTypes.GET_CATEGORIES, getCategoriesSaga),
    takeEvery(actionTypes.ADD_CATEGORY, addCategorySaga),
    takeEvery(actionTypes.UPDATE_CATEGORY, updateCategorySaga),
    takeEvery(actionTypes.DELETE_CATEGORY, deleteCategorySaga)
  ]);
}
