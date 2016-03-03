import * as types from '../actions/actionTypes';

// MOCK UP STATE
// --------------
//   isFetching: false,
//   _id: 'game id',
//   points: 0,
//   questions: [
//     {
//       _id: 'question id',
//       text: 'Question text',
//       answered: false,
//       answers: ['one', 'two', 'three', 'four'],
//     },
//   ],

export const game = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_GAME:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_GAME:
      return Object.assign({}, action.payload.game, {
        isFetching: false,
      });
    case types.RESET_GAME:
      return {};
    default:
      return state;
  }
};
