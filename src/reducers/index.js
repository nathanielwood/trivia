import { combineReducers } from 'redux';
import { multiChoice } from './multiChoice';
import { questionStatus } from './questionStatus';
import { points } from './points';

export const rootReducer = combineReducers({
  multiChoice,
  questionStatus,
  points,
});
