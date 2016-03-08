import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { multiChoice } from './multiChoice';
import { questionStatus } from './questionStatus';
import { game } from './game';
import { questionForm } from './questionForm';
import { questionList } from './questionList';
import { alert } from './alert';
import { modal } from './modal';

export const rootReducer = combineReducers({
  multiChoice,
  questionStatus,
  game,
  questionForm,
  questionList,
  alert,
  modal,
  routing: routerReducer,
  form: formReducer,
});
