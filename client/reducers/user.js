// client/reducers/user.js

import * as types from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_USER:
      return { isFetching: true };
    case types.RECEIVE_USER:
      return action.payload.user;
    case types.RESET_USER:
      return {};
    default:
      return state;
  }
};
