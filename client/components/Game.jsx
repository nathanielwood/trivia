// client/components/Game.jsx

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Well, PageHeader } from 'react-bootstrap';
import MultiChoice from './MultiChoice';
import Points from './Points';
import Status from './Status';
import {
  reset,
  fetchGame,
  fetchNewQuestion,
  selectAnswer,
} from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.newQuestion = this.newQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  componentWillMount() {
    if (!this.props.game._id) {
      this.props.onFetchGame(this.props.params.game_id);
    }
  }
  newQuestion() {
    this.props.onNewQuestion(this.props.game._id);
  }
  selectAnswer(i) {
    this.props.onSelectAnswer(
      this.props.game._id,
      this.props.question._id,
      i
    );
  }
  render() {
    const game = this.props.game;
    if (game.isFetching) {
      return (
        <h2>Loading...</h2>
      );
    } else if (game.finished) {
      const points = game.points;
      const count = game.questions.length;
      const percentage = Number((points / count * 100).toFixed(2));
      return (
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <Well>
              <PageHeader>Game over</PageHeader>
              <h3>{`${points}/${count}`}</h3>
              <h3>{`${percentage}%`}</h3>
              <hr />
              <Button bsStyle="primary" onClick={this.props.onFinishGame} >Done</Button>
            </Well>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-sm-9 col-md-offset-1 col-md-8">
          {this.props.question._id &&
            <div>
              <h3>Question {game.questionCursor + 1} of {game.questions.length}</h3>
              <MultiChoice
                question={this.props.question}
                selectAnswer={this.selectAnswer}
              />
            </div>
          }
        </div>
        <div className="col-sm-3 col-md-2">
          <Points points={game.points} />
          <hr />
          <Status
            status={this.props.status}
            onClick={this.newQuestion}
          />
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  onNewQuestion: React.PropTypes.func,
  onSelectAnswer: React.PropTypes.func,
  onFinishGame: React.PropTypes.func,
  onFetchGame: React.PropTypes.func,
  params: React.PropTypes.shape({
    game_id: React.PropTypes.string,
  }),
  game: React.PropTypes.object,
  question: React.PropTypes.object,
  status: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  question: state.multiChoice,
  game: state.game,
  status: state.questionStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onFinishGame: () => {
    dispatch(reset());
  },
  onFetchGame: (gameId) => {
    dispatch(fetchGame(gameId));
  },
  onNewQuestion: (gameId) => {
    dispatch(fetchNewQuestion(gameId));
  },
  onSelectAnswer: (gameId, questionId, i) => {
    dispatch(selectAnswer(gameId, questionId, i));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
