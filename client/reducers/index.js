import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { multiChoice } from './multiChoice';
import { questionStatus } from './questionStatus';
import { game } from './game';

export const rootReducer = combineReducers({
  multiChoice,
  questionStatus,
  game,
  routing: routerReducer,
});
