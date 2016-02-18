import { connect } from 'react-redux';
import Game from '../components/Game.jsx';
import { newQuestion, answeredCorrect, answeredIncorrect } from '../actions';

const mapStateToProps = (state) => ({
  question: state.multiChoice,
  status: state.questionStatus,
  points: state.points,
});

const mapDispatchToProps = (dispatch) => ({
  onNewQuestion: () => {
    dispatch(newQuestion());
  },
  onCorrectAnswer: (i) => {
    dispatch(answeredCorrect(i, 1));
  },
  onIncorrectAnswer: (i) => {
    dispatch(answeredIncorrect(i));
  },
});

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
