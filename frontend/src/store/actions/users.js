import * as actionTypes from './types';

export const getUsers = () => ({ type: actionTypes.GET_USERS });
export const setUsers = users => ({ type: actionTypes.SET_USERS, users });
export const addUser = (history, name, email, password) => ({
  type: actionTypes.ADD_USER,
  history,
  name,
  email,
  password
});
export const updateUser = (history, id, name, email, password) => ({
  type: actionTypes.UPDATE_USER,
  history,
  id,
  name,
  email,
  password
});
export const deleteUser = (id, name, email) => ({ type: actionTypes.DELETE_USER, id, name, email });
