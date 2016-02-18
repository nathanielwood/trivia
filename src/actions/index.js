import * as types from './actionTypes';

export function newQuestion() {
  return { type: types.NEW_QUESTION };
}
export function answeredCorrect(selected, pointIncrease) {
  return {
    type: types.ANSWERED_CORRECT,
    payload: { selected, pointIncrease },
  };
}
export function answeredIncorrect(selected) {
  return {
    type: types.ANSWERED_INCORRECT,
    payload: { selected },
  };
}
