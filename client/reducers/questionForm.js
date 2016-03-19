// client/reducers/questionForm.js

import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  question: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_QUESTION_FORM:
      return initialState;
    case types.REQUEST_QUESTION:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_QUESTION:
      return Object.assign({}, state, {
        isFetching: false,
        question: action.payload.question,
      });
    default:
      return state;
  }
};
