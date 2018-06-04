import * as types from '../actions/types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default reducer;
