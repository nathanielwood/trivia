// client/components/StartGame.jsx

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { PageHeader, ButtonInput, Well } from 'react-bootstrap';
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
      <Well>
        <PageHeader>Play a trivia game</PageHeader>
        <p>
          A random set of questions will be pulled from the database.
           You can specify how many questions you want in your game.
            More options (i.e. category selections) will be available in future updates.
        </p>
        <form className="form-horizontal" onSubmit={handleSubmit(submit)}>
          <FormInput
            type="number"
            label="Max. # of questions"
            submitFailed={submitFailed}
            overrideLabelClassName="col-xs-12 col-sm-3 col-md-4"
            overrideWrapperClassName="col-xs-12 col-sm-9 col-md-4"
            field={questions}
          />
          <ButtonInput
            type="submit"
            disabled={submitting}
            wrapperClassName="col-xs-12 col-sm-offset-3 col-md-offset-4"
            bsStyle="primary"
          >
            Start game
          </ButtonInput>
        </form>
      </Well>
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
  initialValues: { questions: 10 },
  // validate
}, mapStateToProps)(StartGame);

export default StartGame;
