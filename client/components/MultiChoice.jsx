import React, { Component } from 'react';
import AnswerButton from './AnswerButton';

export default class MultiChoice extends Component {
  constructor() {
    super();
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  selectAnswer(i) {
    if (!this.props.question.answered) this.props.selectAnswer(i);
  }
  styleButton(i) {
    if (this.props.question.answered) {
      if (i === this.props.question.correct) return 'success';
      if (i === this.props.question.selected) return 'danger';
    }
    return 'default';
  }
  render() {
    const answers = this.props.question.answers.map((answer, index) => (
      <AnswerButton
        selectAnswer={this.selectAnswer}
        id={index}
        key={index}
        text={answer}
        style={this.styleButton(index)}
        disabled={this.props.question.answered}
      />
    ));
    return (
      <div>
        <h3>Question {this.props.questionNo} of {this.props.questionCount}</h3>
        <h4>{this.props.question.text}</h4>
        {answers}
      </div>
    );
  }
}
MultiChoice.propTypes = {
  questionNo: React.PropTypes.number,
  questionCount: React.PropTypes.number,
  question: React.PropTypes.object,
  selectAnswer: React.PropTypes.func,
};
