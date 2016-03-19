// client/components/QuestionForm.jsx

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import { validateQuestionForm } from '../utilities/validations';
import FormInput from './FormInput';
import { showModal, hideModal } from '../actions';

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
      formType,
      modal,
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
            <div className="col-sm-offset-3 col-sm-9">
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
                {formType === 'edit' &&
                  <Button
                    type="button"
                    disabled={submitting}
                    onClick={this.props.onShowModal}
                  >Remove</Button>
                }
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
          <Modal bsSize= "small" show={modal.show} onHide={this.props.onHideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Remove Question?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to remove this question?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" onClick={this.props.onRemove}>Yes</Button>
              <Button bsStyle="danger" onClick={this.props.onHideModal}>No</Button>
            </Modal.Footer>
          </Modal>
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
  onRemove: PropTypes.func,
  id: PropTypes.string,
  modal: PropTypes.object,
  onShowModal: PropTypes.func,
  onHideModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isFetching: state.questionForm.isFetching,
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  onShowModal: () => {
    dispatch(showModal());
  },
  onHideModal: () => {
    dispatch(hideModal());
  },
});

QuestionForm = reduxForm({
  form: 'question',
  fields,
  validate: validateQuestionForm,
}, mapStateToProps, mapDispatchToProps)(QuestionForm);

export default QuestionForm;
