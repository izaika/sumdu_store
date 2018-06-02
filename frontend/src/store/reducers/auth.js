import * as types from '../actions/types';

const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return { token: action.token };
    case types.LOG_OUT:
      return { token: null };

    default:
      return state;
  }
};

export default reducer;
