import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Input, Button, ButtonToolbar } from 'react-bootstrap';
import { addQuestion, showForm, hideForm } from '../actions';
import { validateQuestionForm } from '../utilities/validations';


const fields = ['text', 'correct', 'incorrect[]'];

const config = {
  minIncorrect: 1,
  maxIncorrect: 9,
};

const submit = (values, dispatch) => (
  dispatch(addQuestion(values))
);

class QuestionForm extends Component {
  constructor() {
    super();
    this.validationState = this.validationState.bind(this);
    this.addIncorrectAnswer = this.addIncorrectAnswer.bind(this);
    this.removeIncorrectAnswer = this.removeIncorrectAnswer.bind(this);
    this.disableAddIncorrectButton = this.disableAddIncorrectButton.bind(this);
    this.disableRemoveIncorrectButton = this.disableRemoveIncorrectButton.bind(this);
  }
  componentWillMount() {
    this.props.onMount();
    // not sure of the best way to initialize three incorrect fields
    for (let i = 1; i <= 3; i++) {
      this.props.fields.incorrect.addField();
    }
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }
  validationState(field) {
    if (this.props.submitFailed && field.error) return 'error';
    return null;
  }
  errorMessage(field) {
    if (this.props.submitFailed && field.error) return field.error;
    return null;
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
    const {
      fields: { text, correct, incorrect },
      handleSubmit,
      resetForm,
      submitting,
    } = this.props;
    return (
      <div>
        <h3>Add a question</h3>
        <form className="form-horizontal" onSubmit={handleSubmit(submit)}>
          <Input
            type="text"
            label="Question Text"
            labelClassName="col-xs-3"
            wrapperClassName="col-xs-9"
            bsStyle={this.validationState(text)}
            help={this.errorMessage(text)}
            hasFeedback
            {...text}
          />
          <Input
            type="text"
            label="Correct Answer"
            labelClassName="col-xs-3"
            wrapperClassName="col-xs-9"
            bsStyle={this.validationState(correct)}
            help={this.errorMessage(correct)}
            hasFeedback
            {...correct}
          />
          {incorrect.map((answer, index) =>
            <Input
              key={index}
              type="text"
              label={`Incorrect Answer ${index + 1}`}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-9"
              bsStyle={this.validationState(answer)}
              help={this.errorMessage(answer)}
              hasFeedback
              {...answer}
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
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(showForm());
  },
  onUnmount: () => {
    dispatch(hideForm());
  },
});

QuestionForm = reduxForm({
  form: 'question',
  fields,
  validate: validateQuestionForm,
}, mapStateToProps, mapDispatchToProps)(QuestionForm);

export default QuestionForm;
