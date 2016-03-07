import * as types from '../actions/actionTypes';

const initialState = {
  display: false,
  style: '',
  message: '',
};

export const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return Object.assign({}, state, {
        display: true,
        style: action.payload.style,
        message: action.payload.message,
      });
    case types.HIDE_ALERT:
    case '@@router/LOCATION_CHANGE':
      return initialState;
    default:
      return state;
  }
};
