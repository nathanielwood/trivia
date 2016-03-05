import * as types from '../actions/actionTypes';

const initialState = {
  showForm: false,
  questionAddSuccess: false,
};

export const questionForm = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_FORM:
      return Object.assign({}, state, {
        showForm: true,
        questionAddSuccess: false,
      });
    case types.HIDE_FORM:
      return Object.assign({}, state, { showForm: false });
    case types.QUESTION_ADD_SUCCESS:
      return Object.assign({}, state, { questionAddSuccess: true });
    case types.RESET_QUESTION_FORM:
      return initialState;
    default:
      return state;
  }
};
