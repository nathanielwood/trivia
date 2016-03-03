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
function requestAnswer() {
  return { type: types.REQUEST_ANSWER };
}
function receiveAnswer(question) {
  return {
    type: types.RECEIVE_ANSWER,
    payload: { question },
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
          dispatch(receiveAnswer(json2));
        });
      } else {
        dispatch(receiveGame(json));
        dispatch(receiveQuestion(question));
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
    dispatch(requestQuestion());
    fetch(`http://localhost:8080/api/games/${id}/next`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveGame(json));
      const question = json.questions[json.questionCursor];
      dispatch(receiveQuestion(question));
    });
  };
}

export function selectAnswer(gameId, questionId, index) {
  return (dispatch) => {
    dispatch(requestAnswer());
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
      dispatch(receiveAnswer(question));
      dispatch(receiveGame(json));
    });
  };
}
