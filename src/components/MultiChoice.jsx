import React, { Component } from 'react';
import AnswerButton from './AnswerButton.jsx';

export default class MultiChoice extends Component {
  constructor() {
    super();
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  selectAnswer(i) {
    if (!this.props.question.answered) this.props.selectAnswer(i);
  }
  render() {
    const answers = this.props.question.answers.map((answer, index) => (
      <AnswerButton
        selectAnswer={this.selectAnswer}
        id={index}
        key={index}
        text={answer}
        correct={this.props.question.correct === index}
        disabled={this.props.question.answered}
      />
    ));
    return (
      <div>
        <h3>Question</h3>
        <h4>{this.props.question.text}</h4>
        {answers}
      </div>
    );
  }
}
MultiChoice.propTypes = {
  question: React.PropTypes.object,
  selectAnswer: React.PropTypes.func,
};
