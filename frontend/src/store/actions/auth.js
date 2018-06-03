import * as actionTypes from './types';

export const logIn = (email, password) => ({ type: actionTypes.LOG_IN, email, password });
export const logOut = () => ({ type: actionTypes.LOG_OUT });
export const setToken = (token, userId) => ({ type: actionTypes.SET_TOKEN, token, userId });
