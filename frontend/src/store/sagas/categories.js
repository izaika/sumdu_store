import axios from 'axios';
import alertify from 'alertify.js';
import { put } from 'redux-saga/effects';

import routes from '../../shared/routes';
import * as actionTypes from '../actions/types';
import { startProcess, stopProcess } from '../actions/process';
import { setCategories, getCategories } from '../actions/categories';

export function* getCategoriesSaga(action) {
  yield put(startProcess(actionTypes.GET_CATEGORIES));
  try {
    const response = yield axios({ method: 'get', url: 'categories' });
    yield put(setCategories(response.data.categories));
  } catch (error) {
    alertify.error('Cannot get categories. Please try again later.');
  }
  yield put(stopProcess(actionTypes.GET_CATEGORIES));
}

export function* addCategorySaga(action) {
  yield put(startProcess(actionTypes.ADD_CATEGORY));
  const { history, title } = action;
  try {
    const response = yield axios({
      method: 'post',
      url: 'categories',
      data: { title }
    });
    yield put(getCategories());
    history.push(routes.categories);
    alertify.success(`Category ${title} has been added.`);
  } catch (error) {
    alertify.error('Cannot save category. Please try again later.');
  }
  yield put(stopProcess(actionTypes.ADD_CATEGORY));
}

export function* updateCategorySaga(action) {
  yield put(startProcess(actionTypes.UPDATE_CATEGORY));
  const { history, id, title } = action;
  try {
    const response = yield axios({
      method: 'put',
      url: `categories/${id}`,
      data: { title }
    });
    yield put(getCategories());
    history.push(routes.categories);
    alertify.success(`Category has been updated.`);
  } catch (error) {
    alertify.error('Cannot update category. Please try again later.');
  }
  yield put(stopProcess(actionTypes.UPDATE_CATEGORY));
}

export function* deleteCategorySaga(action) {
  yield put(startProcess(actionTypes.DELETE_CATEGORY));
  const { id, title } = action;
  try {
    yield axios({
      method: 'delete',
      url: `categories/${id}`
    });
    alertify.success(`Category ${title} has been deleted.`);
    yield put(getCategories());
  } catch (error) {
    alertify.error('Cannot delete category. Please try again later.');
  }
  yield put(stopProcess(actionTypes.DELETE_CATEGORY));
}
