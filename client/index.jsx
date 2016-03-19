// client/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './reducers';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import StartGame from './components/StartGame';
import Game from './components/Game';
import Question from './components/Question';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { logoutUser } from './actions';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
const history = syncHistoryWithStore(browserHistory, store);
const logout = (nextState, replace) => {
  store.dispatch(logoutUser());
  replace({ pathname: '/login' });
};

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="forgot-password" component={ForgotPassword} />
        <Route path="reset-password" component={ResetPassword} />
        <Route path="logout" onEnter={logout} />
        <Route path="about" component={About} />
        <Route path="question" component={Question}>
          <Route path="add" component={AddQuestion} />
          <Route path="edit/:question_id" component={EditQuestion} />
        </Route>
        <Route path="game" component={StartGame} />
        <Route path="game/:game_id" component={Game} />
      </Route>
    </Router>
  </Provider>),
  document.getElementById('root')
);
