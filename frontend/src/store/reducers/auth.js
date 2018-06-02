import * as types from '../actions/types';

const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case types.AUTH_SAVE_TOKEN:
      return { token: action.token };

    default:
      return state;
  }
};

export default reducer;
