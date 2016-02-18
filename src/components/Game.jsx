import React, { Component } from 'react';
import MultiChoice from './MultiChoice.jsx';
import Points from './Points.jsx';
import Status from './Status.jsx';

export default class Game extends Component {
  constructor() {
    super();
    this.newQuestion = this.newQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  newQuestion() {
    this.props.onNewQuestion();
  }
  selectAnswer(i) {
    if (i === this.props.question.correct) {
      this.props.onCorrectAnswer(i);
    } else {
      this.props.onIncorrectAnswer(i);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <MultiChoice
            question={this.props.question}
            selectAnswer={this.selectAnswer}
          />
        </div>
        <div className="col-sm-3">
          <Points points={this.props.points} />
          <hr />
          <Status
            visible={this.props.status.visible}
            correct={this.props.status.correct}
            onClick={this.newQuestion}
          />
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  onNewQuestion: React.PropTypes.func,
  onAnswerQuestion: React.PropTypes.func,
  onCorrectAnswer: React.PropTypes.func,
  onIncorrectAnswer: React.PropTypes.func,
  question: React.PropTypes.object,
  status: React.PropTypes.shape({
    visible: React.PropTypes.bool,
    correct: React.PropTypes.bool,
  }),
  points: React.PropTypes.number,
};
