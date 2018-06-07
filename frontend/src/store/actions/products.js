import * as actionTypes from './types';

export const getProducts = () => ({ type: actionTypes.GET_PRODUCTS });
export const setProducts = products => ({ type: actionTypes.SET_PRODUCTS, products });
export const addProduct = (history, title, description, price, categoryId, uploadedImage) => ({
  type: actionTypes.ADD_PRODUCT,
  history,
  title,
  description,
  price,
  categoryId,
  uploadedImage
});
export const updateProduct = (history, id, title, description, price, categoryId, uploadedImage) => ({
  type: actionTypes.UPDATE_PRODUCT,
  history,
  id,
  title,
  description,
  price,
  categoryId,
  uploadedImage
});
export const deleteProduct = (id, title) => ({ type: actionTypes.DELETE_PRODUCT, id, title });
