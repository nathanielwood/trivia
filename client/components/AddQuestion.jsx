import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import { addQuestion } from '../actions';

export default class AddQuestion extends Component {
  handleSubmit(values, dispatch) {
    return dispatch(addQuestion(values));
  }
  render() {
    return (
      <QuestionForm title="Add a question" onSubmit={this.handleSubmit} />
    );
  }
}
