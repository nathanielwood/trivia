// client/reducers/resetPassword.js

import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  validToken: false,
  passwordChanged: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_TOKEN_VALIDATION:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_TOKEN_VALIDATION:
      return Object.assign({}, state, {
        isFetching: false,
        validToken: action.payload.valid,
      });
    case types.PASSWORD_CHANGED:
      return Object.assign({}, state, { passwordChanged: true });
    case '@@router/LOCATION_CHANGE':
      return initialState;
    default:
      return state;
  }
};
