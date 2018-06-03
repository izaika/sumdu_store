import * as types from '../actions/types';

const reducer = (state = { token: null, userId: null }, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return { token: action.token, userId: action.userId };
    case types.LOG_OUT:
      return { token: null, userId: null };

    default:
      return state;
  }
};

export default reducer;
