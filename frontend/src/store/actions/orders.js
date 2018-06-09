import * as actionTypes from './types';

export const getOrders = () => ({ type: actionTypes.GET_ORDERS });
export const setOrders = orders => ({ type: actionTypes.SET_ORDERS, orders });
export const addOrder = (history, name, email, phone, comment, products) => ({
  type: actionTypes.ADD_ORDER,
  history,
  name,
  email,
  phone,
  comment,
  products
});
export const updateOrder = (history, id, status) => ({ type: actionTypes.UPDATE_ORDER, history, id, status });
export const deleteOrder = id => ({ type: actionTypes.DELETE_ORDER, id });
