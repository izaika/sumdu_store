import * as actionTypes from './types';

export const logIn = (email, password) => ({ type: actionTypes.AUTH_LOG_IN, email, password });
export const logOut = () => ({ type: actionTypes.AUTH_LOG_OUT });
export const saveToken = token => ({ type: actionTypes.AUTH_SAVE_TOKEN, token });
