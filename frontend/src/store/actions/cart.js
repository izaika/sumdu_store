import * as actionTypes from './types';

export const getCartProducts = () => ({ type: actionTypes.GET_CART_PRODUCTS });
export const setCartProducts = products => ({ type: actionTypes.SET_CART_PRODUCTS, products });
export const addProductToCart = productId => ({ type: actionTypes.ADD_PRODUCT_TO_CART, productId });
export const removeProductFromCart = productId => ({ type: actionTypes.REMOVE_PRODUCT_FROM_CART, productId });
export const clearCart = () => ({ type: actionTypes.CLEAR_CART });
