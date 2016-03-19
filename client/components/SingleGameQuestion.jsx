// client/components/SingleGameQuestion.jsx

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { fetchSingleGameQuestion, answerSingleGameQuestion } from '../actions';
import MultiChoice from './MultiChoice';
import Status from './Status';

class Home extends Component {
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }
  componentWillMount() {
    if (!this.props.singleGame.text) {
      this.props.onFetch();
    }
  }
  handleAnswer(i) {
    const correct = i === this.props.singleGame.correct;
    this.props.onAnswer(i, correct);
  }
  handleNextQuestion() {
    this.props.onFetch();
  }
  render() {
    const question = this.props.singleGame;
    if (!question.text) {
      return <Well><h3>Loading...</h3></Well>;
    }
    return (
      <Well>
        <h4>Random Trivia Question</h4>
        <hr />
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <MultiChoice question={question} selectAnswer={this.handleAnswer} />
          </div>
          <div className="col-sm-2">
            <Status status={this.props.status} onClick={this.handleNextQuestion} />
          </div>
        </div>
      </Well>
    );
  }
}
Home.propTypes = {
  onFetch: PropTypes.func,
  onAnswer: PropTypes.func,
  singleGame: PropTypes.object,
  status: PropTypes.object,
};

const mapStateToProps = (state) => ({
  singleGame: state.singleGame,
  status: state.singleGameQuestionStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onFetch: (showLoading) => {
    dispatch(fetchSingleGameQuestion(showLoading));
  },
  onAnswer: (i, correct) => {
    dispatch(answerSingleGameQuestion(i, correct));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
