import * as types from '../actions/actionTypes';

const initialState = {
  visible: false,
  correct: false,
  disableButton: false,
};

export const questionStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GAME_QUESTION:
      return Object.assign({}, state, { disableButton: true });
    case types.RECEIVE_GAME_QUESTION:
      return Object.assign({}, state, {
        visible: false,
        disableButton: false,
      });
    case types.RECEIVE_GAME_ANSWER:
      return Object.assign({}, state, {
        visible: true,
        correct: action.payload.question.answeredCorrect,
      });
    case types.RESET_GAME:
      return initialState;
    default:
      return state;
  }
};
