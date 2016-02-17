import React, { Component } from 'react';
import MultiChoice from './MultiChoice.jsx';
import Points from './Points.jsx';
import Status from './Status.jsx';
import { generateQuestion } from '../data/questions';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: generateQuestion(),
      answered: false,
      points: 0,
      status: {
        visible: false,
        correct: false,
      },
    };
    this.newQuestion = this.newQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  newQuestion() {
    this.setState({
      question: generateQuestion(),
      answered: false,
      status: {
        visible: false,
      },
    });
  }
  selectAnswer(i) {
    let points = this.state.points;
    if (i === this.state.question.correct) points++;
    this.setState({
      answered: true,
      status: {
        visible: true,
        correct: i === this.state.question.correct,
      },
      points,
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <MultiChoice
            question={this.state.question.text}
            answers={this.state.question.answers}
            correct={this.state.question.correct}
            selectAnswer={this.selectAnswer}
            answered={this.state.answered}
          />
        </div>
        <div className="col-sm-3">
          <Points points={this.state.points} />
          <hr />
          <Status
            visible={this.state.status.visible}
            correct={this.state.status.correct}
            onClick={this.newQuestion}
          />
        </div>
      </div>
    );
  }
}
