import * as actionTypes from './types';

export const getCategories = () => ({ type: actionTypes.GET_CATEGORIES });
export const setCategories = categories => ({ type: actionTypes.SET_CATEGORIES, categories });
export const addCategory = (history, title) => ({
  type: actionTypes.ADD_CATEGORY,
  history,
  title
});
export const updateCategory = (history, id, title) => ({
  type: actionTypes.UPDATE_CATEGORY,
  history,
  id,
  title
});
export const deleteCategory = (id, title) => ({ type: actionTypes.DELETE_CATEGORY, id, title });
