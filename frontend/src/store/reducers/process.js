import { List } from 'immutable';

import * as actionTypes from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.START_PROCESS:
      return List(state).push(action.process);
    case actionTypes.STOP_PROCESS:
      return state.filter(item => item !== action.process);
    default:
      return state;
  }
};
