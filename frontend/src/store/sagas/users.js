import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import routes from '../../shared/routes';
import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setUsers, getUsers } from '../actions/users';

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

export function* addUserSaga(action) {
  yield put(startProcess(actionTypes.ADD_USER));
  const { history, name, email, password } = action;
  try {
    const response = yield axios({
      method: 'post',
      url: 'users',
      data: { name, email, password }
    });
    yield put(getUsers());
    history.push(routes.users);
    alertify.success(`User ${name}<${email}> has been added.`);
  } catch (error) {
    alertify.error('Cannot save user. Please try again later.');
  }
  yield put(stopProcess(actionTypes.ADD_USER));
}

export function* updateUserSaga(action) {
  yield put(startProcess(actionTypes.UPDATE_USER));
  const { history, id, name, email, password } = action;
  try {
    yield axios({
      method: 'put',
      url: `users/${id}`,
      data: { name, email, password }
    });
    yield put(getUsers());
    history.push(routes.users);
    alertify.success(`User ${name}<${email}> has been updated.`);
  } catch (error) {
    alertify.error('Cannot update user. Please try again later.');
  }
  yield put(stopProcess(actionTypes.UPDATE_USER));
}

export function* deleteUserSaga(action) {
  yield put(startProcess(actionTypes.DELETE_USER));
  const { id, name, email } = action;
  try {
    yield axios({
      method: 'delete',
      url: `users/${id}`
    });
    alertify.success(`User ${name}<${email}> has been deleted.`);
    yield put(getUsers());
  } catch (error) {
    alertify.error('Cannot delete user. Please try again later.');
  }
  yield put(stopProcess(actionTypes.DELETE_USER));
}
