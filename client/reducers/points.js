import * as types from '../actions/actionTypes';

const initialState = 0;

export const points = (state = initialState, action) => {
  switch (action.type) {
    case types.ANSWERED_CORRECT:
      return state + action.payload.pointIncrease;
    default:
      return state;
  }
};
