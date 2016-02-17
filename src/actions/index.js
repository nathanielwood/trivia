import * as types from './actionTypes';

export function newQuestion() {
  return { type: types.NEW_QUESTION };
}
export function answeredCorrect(pointIncrease) {
  return {
    type: types.ANSWERED_CORRECT,
    payload: { pointIncrease },
  };
}
export function answeredIncorrect() {
  return { type: types.ANSWERED_INCORRECT };
}
