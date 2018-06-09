import * as types from '../actions/types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
};

export default reducer;
