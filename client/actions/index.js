import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
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
export function showForm() {
  return { type: types.SHOW_FORM };
}
export function hideForm() {
  return { type: types.HIDE_FORM };
}
function questionAddSuccess() {
  return { type: types.QUESTION_ADD_SUCCESS };
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

export function newGame() {
  return (dispatch) => {
    dispatch(requestGame());
    fetch('http://localhost:8080/api/games', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 3,
      }),
    })
    .then(response => response.json())
    .then(json => {
      browserHistory.push(`/game/${json._id}`);
    });
  };
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

export function addQuestion(values) {
  return (dispatch) => (
    new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/questions', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(json => {
        // check for error
        if (json.errors) return reject(json.errors);
        dispatch(questionAddSuccess());
        browserHistory.push('/question');
        return resolve();
      });
    })
  );
}

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    fetch('http://localhost:8080/api/questions')
    .then(response => response.json())
    .then(json => {
      dispatch(receiveQuestions(json));
    });
  };
}
