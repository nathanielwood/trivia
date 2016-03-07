import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { ButtonInput } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { newGame } from '../actions';
import FormInput from './FormInput';

const fields = ['questions'];

const submit = (values, dispatch) => (
  dispatch(newGame(values))
);

class StartGame extends Component {
  componentWillMount() {
    if (this.props.game._id) {
      browserHistory.push(`/game/${this.props.game._id}`);
    }
  }
  render() {
    const {
      fields: { questions },
      handleSubmit,
      submitting,
      submitFailed,
    } = this.props;
    questions.min = 1;
    return (
      <div>
        <h2>Play a trivia game</h2>
        <form className="form-horizontal" onSubmit={handleSubmit(submit)}>
          <FormInput
            type="number"
            label="Max. number of questions"
            submitFailed={submitFailed}
            overrideLabelClassName="col-xs-4"
            overrideWrapperClassName="col-xs-2"
            field={questions}
          />
          <ButtonInput
            type="submit"
            disabled={submitting}
            wrapperClassName="col-xs-offset-4 col-xs-8"
            bsStyle="primary"
          >
            Start game
          </ButtonInput>
        </form>
      </div>
    );
  }
}
StartGame.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  game: PropTypes.object,
  submitFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

StartGame = reduxForm({
  form: 'startGame',
  fields,
  initialValues: { questions: 5 },
  // validate
}, mapStateToProps)(StartGame);

export default StartGame;
