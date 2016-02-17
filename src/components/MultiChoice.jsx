import React, { Component } from 'react';
import AnswerButton from './AnswerButton.jsx';

export default class MultiChoice extends Component {
  constructor() {
    super();
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  selectAnswer(i) {
    if (!this.props.answered) this.props.selectAnswer(i);
  }
  render() {
    const answers = this.props.answers.map((answer, index) => (
      <AnswerButton
        selectAnswer={this.selectAnswer}
        id={index}
        key={index}
        text={answer}
        correct={this.props.correct === index}
        disabled={this.props.answered}
      />
    ));
    return (
      <div>
        <h3>Question</h3>
        <h4>{this.props.question}</h4>
        {answers}
      </div>
    );
  }
}
MultiChoice.propTypes = {
  question: React.PropTypes.string,
  answers: React.PropTypes.array,
  correct: React.PropTypes.number,
  selectAnswer: React.PropTypes.func,
  answered: React.PropTypes.bool,
};
