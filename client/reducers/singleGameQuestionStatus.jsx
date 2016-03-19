// client/reducers/singleGameStatus.js

import * as types from '../actions/actionTypes';

const initialState = {
  visible: false,
  correct: false,
  disableButton: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SINGLE_GAME_QUESTION:
      return Object.assign({}, state, { disableButton: true });
    case types.RECEIVE_SINGLE_GAME_QUESTION:
      return Object.assign({}, state, {
        visible: false,
        disableButton: false,
      });
    case types.ANSWER_SINGLE_GAME_QUESTION:
      return Object.assign({}, state, {
        visible: true,
        correct: action.payload.correct,
      });
    default:
      return state;
  }
};
