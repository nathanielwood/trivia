// client/reducers/questionListOptions.js

import * as types from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.SET_FILTER_OPTIONS:
      return Object.assign({}, state, action.payload.options);
    case types.RESET_QUESTION_LIST:
      return {};
    default:
      return state;
  }
};
