import { generateQuestion } from '../data/questions';
import * as types from '../actions/actionTypes';

const initialState = generateQuestion();

export const multiChoice = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_QUESTION:
      return Object.assign({}, state, generateQuestion());
    case types.ANSWERED_CORRECT:
    case types.ANSWERED_INCORRECT:
      return Object.assign({}, state, { answered: true });
    default:
      return state;
  }
};
