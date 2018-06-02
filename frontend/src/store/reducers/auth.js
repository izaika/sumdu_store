import * as types from '../actions/types';

const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case types.AUTH_SET_TOKEN:
      return { token: action.token };
    case types.AUTH_LOG_OUT:
      return { token: null };

    default:
      return state;
  }
};

export default reducer;
