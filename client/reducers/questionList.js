import * as types from '../actions/actionTypes';

export const questionList = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_QUESTIONS:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_QUESTIONS: {
      const { docs, limit, page, pages, total } = action.payload.questions;
      return {
        questions: docs,
        pagination: { limit, page, pages, total },
        isFetching: false,
      };
    }
    case types.RESET_QUESTION_LIST:
      return {};
    default:
      return state;
  }
};
