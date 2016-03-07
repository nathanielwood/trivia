import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { validateQuestionForm } from '../utilities/validations';
import FormInput from './FormInput';

const fields = ['text', 'correct', 'incorrect[]'];

const config = {
  minIncorrect: 1,
  maxIncorrect: 9,
};

class QuestionForm extends Component {
  constructor() {
    super();
    this.addIncorrectAnswer = this.addIncorrectAnswer.bind(this);
    this.removeIncorrectAnswer = this.removeIncorrectAnswer.bind(this);
    this.disableAddIncorrectButton = this.disableAddIncorrectButton.bind(this);
    this.disableRemoveIncorrectButton = this.disableRemoveIncorrectButton.bind(this);
  }
  componentWillMount() {
    // not sure of the best way to initialize three incorrect fields
    if (this.props.formType !== 'edit') {
      for (let i = 1; i <= 3; i++) {
        this.props.fields.incorrect.addField();
      }
    }
  }
  addIncorrectAnswer(event) {
    event.preventDefault();
    if (this.props.fields.incorrect.length < config.maxIncorrect) {
      this.props.fields.incorrect.addField();
    }
  }
  removeIncorrectAnswer(event) {
    event.preventDefault();
    if (this.props.fields.incorrect.length > config.minIncorrect) {
      this.props.fields.incorrect.removeField();
    }
  }
  disableAddIncorrectButton() {
    if (this.props.submitting ||
      this.props.fields.incorrect.length >= config.maxIncorrect) {
      return true;
    }
    return false;
  }
  disableRemoveIncorrectButton() {
    if (this.props.submitting ||
      this.props.fields.incorrect.length <= config.minIncorrect) {
      return true;
    }
    return false;
  }
  render() {
    if (this.props.isFetching) {
      return (
        <div>
          <h3>Loading</h3>
          <hr />
        </div>
      );
    }
    const {
      fields: { text, correct, incorrect },
      handleSubmit,
      resetForm,
      submitting,
      submitFailed,
      title,
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h3>
              {title}
              <Link to="/question" className="close"><span>&times;</span></Link>
            </h3>
          </div>
        </div>
        <hr />
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            label="Question Text"
            submitFailed={submitFailed}
            field={text}
          />
          <FormInput
            type="text"
            label="Correct Answer"
            submitFailed={submitFailed}
            field={correct}
          />
          {incorrect.map((answer, index) =>
            <FormInput
              key={index}
              type="text"
              label={`Incorrect Answer ${index + 1}`}
              submitFailed={submitFailed}
              field={answer}
            />
          )}
          <div className="form-group">
            <div className="col-xs-offset-3 col-xs-9">
              <ButtonToolbar>
                <Button
                  type="submit"
                  disabled={submitting}
                  bsStyle="primary"
                >Submit</Button>
                <Button
                  type="reset"
                  disabled={submitting}
                  onClick={resetForm}
                >Reset</Button>
                <Button
                  type="button"
                  disabled={this.disableRemoveIncorrectButton()}
                  className="pull-right"
                  onClick={this.removeIncorrectAnswer}
                >-</Button>
                <Button
                  type="button"
                  disabled={this.disableAddIncorrectButton()}
                  className="pull-right"
                  onClick={this.addIncorrectAnswer}
                >+</Button>
              </ButtonToolbar>
            </div>
          </div>
        </form>
        <hr />
      </div>
    );
  }
}
QuestionForm.propTypes = {
  fields: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  formType: PropTypes.string,
  isFetching: PropTypes.bool,
  title: PropTypes.string,
  submit: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isFetching: state.questionForm.isFetching,
});

QuestionForm = reduxForm({
  form: 'question',
  fields,
  validate: validateQuestionForm,
}, mapStateToProps)(QuestionForm);

export default QuestionForm;
