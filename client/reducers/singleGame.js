// client/reducers/singleGame.js

import * as types from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_SINGLE_GAME_QUESTION:
      return action.payload.question;
    case types.ANSWER_SINGLE_GAME_QUESTION:
      return Object.assign({}, state, {
        answered: true,
        selected: action.payload.answer,
      });
    default:
      return state;
  }
};
