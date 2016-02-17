import * as types from '../actions/actionTypes';

const initialState = {
  visible: false,
  correct: false,
};

export const questionStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_QUESTION:
      return Object.assign({}, state, { visible: false });
    case types.ANSWERED_CORRECT:
      return Object.assign({}, state, {
        visible: true,
        correct: true,
      });
    case types.ANSWERED_INCORRECT:
      return Object.assign({}, state, {
        visible: true,
        correct: false,
      });
    default:
      return state;
  }
};
