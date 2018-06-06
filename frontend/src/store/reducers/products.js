import * as types from '../actions/types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default reducer;
