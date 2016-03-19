// client/reducers/index.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import multiChoice from './multiChoice';
import questionStatus from './questionStatus';
import game from './game';
import singleGame from './singleGame';
import singleGameQuestionStatus from './singleGameQuestionStatus';
import questionForm from './questionForm';
import questionList from './questionList';
import questionListOptions from './questionListOptions';
import alert from './alert';
import modal from './modal';
import user from './user';
import resetPassword from './resetPassword';

export default combineReducers({
  multiChoice,
  questionStatus,
  game,
  singleGame,
  singleGameQuestionStatus,
  questionForm,
  questionList,
  questionListOptions,
  alert,
  modal,
  user,
  resetPassword,
  routing: routerReducer,
  form: formReducer,
});
