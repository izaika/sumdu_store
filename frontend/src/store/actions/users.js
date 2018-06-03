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
