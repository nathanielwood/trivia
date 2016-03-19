// client/actions/index.js
/* global FB gapi */

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import * as types from './actionTypes';

function resetGame() {
  return { type: types.RESET_GAME };
}
function requestGame() {
  return { type: types.REQUEST_GAME };
}
function receiveGame(game) {
  return {
    type: types.RECEIVE_GAME,
    payload: { game },
  };
}
function requestGameAnswer() {
  return { type: types.REQUEST_GAME_ANSWER };
}
function receiveGameAnswer(question) {
  return {
    type: types.RECEIVE_GAME_ANSWER,
    payload: { question },
  };
}
function requestGameQuestion() {
  return { type: types.REQUEST_GAME_QUESTION };
}
function receiveGameQuestion(question) {
  return {
    type: types.RECEIVE_GAME_QUESTION,
    payload: { question },
  };
}
function requestSingleGameQuestion() {
  return { type: types.REQUEST_SINGLE_GAME_QUESTION };
}
function receiveSingleGameQuestion(question) {
  return {
    type: types.RECEIVE_SINGLE_GAME_QUESTION,
    payload: { question },
  };
}
export function answerSingleGameQuestion(answer, correct) {
  return {
    type: types.ANSWER_SINGLE_GAME_QUESTION,
    payload: { answer, correct },
  };
}
function showAlert(style, message) {
  return {
    type: types.SHOW_ALERT,
    payload: { style, message },
  };
}
export function hideAlert() {
  return { type: types.HIDE_ALERT };
}
export function resetQuestionForm() {
  return { type: types.RESET_QUESTION_FORM };
}
function requestQuestions() {
  return { type: types.REQUEST_QUESTIONS };
}
function receiveQuestions(questions) {
  return {
    type: types.RECEIVE_QUESTIONS,
    payload: { questions },
  };
}
export function resetQuestionList() {
  return { type: types.RESET_QUESTION_LIST };
}
export function setFilterOptions(options) {
  return {
    type: types.SET_FILTER_OPTIONS,
    payload: { options },
  };
}
function requestQuestion() {
  return { type: types.REQUEST_QUESTION };
}
function receiveQuestion(question) {
  return {
    type: types.RECEIVE_QUESTION,
    payload: { question },
  };
}
export function showModal() {
  return { type: types.SHOW_MODAL };
}
export function hideModal() {
  return { type: types.HIDE_MODAL };
}
function requestUser() {
  return { type: types.REQUEST_USER };
}
function receiveUser(user) {
  return {
    type: types.RECEIVE_USER,
    payload: { user },
  };
}
function resetUser() {
  return { type: types.RESET_USER };
}
function requestTokenValidation() {
  return { type: types.REQUEST_TOKEN_VALIDATION };
}
function receiveTokenValidation(valid) {
  return {
    type: types.RECEIVE_TOKEN_VALIDATION,
    payload: { valid },
  };
}
function passwordChanged() {
  return { type: types.PASSWORD_CHANGED };
}

export function registerUser(values) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/accounts/register', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(json => {
        if (json.errors) return reject(json.errors);
        cookie.save('auth', json.token, { path: '/' });
        browserHistory.push('/');
        dispatch(receiveUser(json.user));
        return resolve();
      });
    })
  );
}

export function loginUser(values) {
  return dispatch => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/accounts/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(json => {
        if (json.errors) return reject(json.errors);
        cookie.save('auth', json.token, { path: '/' });
        browserHistory.push('/');
        dispatch(receiveUser(json.user));
        return resolve();
      });
    })
  );
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(resetUser());
    cookie.remove('auth', { path: '/' });
    // logout of Facebook if applicable
    if (typeof FB !== 'undefined') {
      FB.getLoginStatus(res => {
        if (res.status === 'connected') FB.logout();
      });
    }
    // logout of Google if applicable
    if (typeof gapi !== 'undefined' && gapi.auth2) {
      const auth2 = gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        auth2.signOut();
      }
    }
  };
}

export function loginFacebook(values) {
  return (dispatch) => {
    fetch('http://localhost:8080/api/accounts/facebook', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${values.authResponse.accessToken}`,
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      cookie.save('auth', json.token, { path: '/' });
      browserHistory.push('/');
      dispatch(receiveUser(json.user));
    }, () => {
      // handle unauthorized access token
    });
  };
}

export function loginGoogle(values) {
  return (dispatch) => {
    fetch('http://localhost:8080/api/accounts/google', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token: values.id_token }),
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      cookie.save('auth', json.token, { path: '/' });
      browserHistory.push('/');
      dispatch(receiveUser(json.user));
    }, () => {
      // handle unauthorized access token
    });
  };
}

export function registerUsername(values) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/accounts/register-username', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: cookie.load('auth'),
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json.errors) return reject(json.errors);
        dispatch(receiveUser(json.user));
        return resolve();
      }, () => {
        // handle unauthorized access token
      });
    })
  );
}

export function getUser(token) {
  return (dispatch) => {
    dispatch(requestUser());
    fetch('http://localhost:8080/api/accounts/profile', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => (
      dispatch(receiveUser(json.user))
    ), () => {
      // token unauthorized, user needs to login again
      dispatch(logoutUser());
      browserHistory.push('/login');
    });
  };
}

export function forgotPassword(values) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/forgot-password', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(json => {
        if (json.errors) return reject(json.errors);
        dispatch(showAlert('success', json.message));
        return resolve();
      });
    })
  );
}

export function validateForgotPasswordToken(token) {
  return (dispatch) => {
    dispatch(requestTokenValidation());
    fetch('http://localhost:8080/api/forgot-password/validate', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      dispatch(receiveTokenValidation(json.success));
    }, () => {
      dispatch(receiveTokenValidation(false));
    });
  };
}

export function resetPassword(values, token) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/reset-password', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json.success) {
          dispatch(passwordChanged());
        } else {
          dispatch(receiveTokenValidation(false));
        }
        return resolve();
      }, () => {
        dispatch(receiveTokenValidation(false));
        return reject();
      });
    })
  );
}

export function fetchGame(id) {
  return (dispatch) => {
    dispatch(requestGame());
    return fetch(`http://localhost:8080/api/games/${id}`)
    .then(response => response.json())
    .then(json => {
      const question = json.questions[json.questionCursor];
      // if a question is already answered, need to get the correct answer
      if (question.answered) {
        fetch(`http://localhost:8080/api/games/${id}/${question._id}`)
        .then(response => response.json())
        .then(json2 => {
          dispatch(receiveGame(json));
          dispatch(receiveGameAnswer(json2));
        });
      } else {
        dispatch(receiveGame(json));
        dispatch(receiveGameQuestion(question));
      }
    });
  };
}

export function fetchSingleGameQuestion() {
  return (dispatch) => {
    dispatch(requestSingleGameQuestion());
    fetch('http://localhost:8080/api/games')
    .then(response => response.json())
    .then(json => {
      dispatch(receiveSingleGameQuestion(json.question));
    });
  };
}

export function newGame(values) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      dispatch(requestGame());
      const limit = Math.abs(parseInt(values.questions, 10)) || 5;
      fetch('http://localhost:8080/api/games', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit }),
      })
      .then(response => response.json())
      .then(json => {
        if (json.errors) return reject(json.errors);
        browserHistory.push(`/game/${json._id}`);
        return resolve();
      });
    })
  );
}

export function reset() {
  return (dispatch) => {
    dispatch(resetGame());
    browserHistory.push('/game');
  };
}

export function fetchNewQuestion(id) {
  return (dispatch) => {
    dispatch(requestGameQuestion());
    fetch(`http://localhost:8080/api/games/${id}/next`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveGame(json));
      const question = json.questions[json.questionCursor];
      dispatch(receiveGameQuestion(question));
    });
  };
}

export function selectAnswer(gameId, questionId, index) {
  return (dispatch) => {
    dispatch(requestGameAnswer());
    return fetch(`http://localhost:8080/api/games/${gameId}/${questionId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selected: String(index),
      }),
    })
    .then(response => response.json())
    .then(json => {
      const question = json.questions[json.questionCursor];
      dispatch(receiveGameAnswer(question));
      dispatch(receiveGame(json));
    });
  };
}

export function fetchQuestions(options, page) {
  return (dispatch) => {
    dispatch(requestQuestions());
    const limit = options && options.limit ? options.limit : '20';
    let query = `?limit=${limit}`;
    if (page) query = `${query}&page=${page}`;
    if (options && options.showAnswers) query += '&answers=true';
    if (options && options.terms) query = `${query}&terms=${encodeURIComponent(options.terms)}`;
    if (options && options.username) {
      query = `${query}&username=${encodeURIComponent(options.username)}`;
    }
    fetch(`http://localhost:8080/api/questions${query}`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveQuestions(json));
    });
  };
}

export function fetchQuestion(questionId) {
  return (dispatch) => {
    dispatch(requestQuestion());
    fetch(`http://localhost:8080/api/questions/${questionId}`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveQuestion(json));
    });
  };
}

export function addQuestion(values, listOptions, page) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/questions', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: cookie.load('auth'),
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        // check for error
        if (json.errors) return reject(json.errors);
        dispatch(fetchQuestions(listOptions, page));
        browserHistory.push('/question');
        dispatch(showAlert('success', 'Question added'));
        return resolve();
      }, () => {
        // token unauthorized, user needs to login again
        dispatch(logoutUser());
        browserHistory.push('/login');
      });
    })
  );
}

export function editQuestion(questionId, values, listOptions, page) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/api/questions/${questionId}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: cookie.load('auth'),
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json.errors) return reject(json.errors);
        dispatch(fetchQuestions(listOptions, page));
        browserHistory.push('/question');
        dispatch(showAlert('success', 'Question edited'));
        return resolve();
      }, () => {
        // token unauthorized, user needs to login again
        dispatch(logoutUser());
        browserHistory.push('/login');
      });
    })
  );
}

export function removeQuestion(questionId, listOptions, page) {
  return (dispatch) => {
    dispatch(requestQuestion());
    fetch(`http://localhost:8080/api/questions/${questionId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: cookie.load('auth'),
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      if (!json.success) return dispatch(showAlert('danger', json.message));
      dispatch(resetQuestionForm());
      dispatch(fetchQuestions(listOptions, page));
      browserHistory.push('/question');
      return dispatch(showAlert('success', json.message));
    }, () => {
      // token unauthorized, user needs to login again
      dispatch(logoutUser());
      browserHistory.push('/login');
    });
  };
}
