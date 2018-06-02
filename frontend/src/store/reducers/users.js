import * as types from '../actions/types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default reducer;
