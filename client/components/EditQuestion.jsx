import React, { Component, PropTypes } from 'react';
import QuestionForm from './QuestionForm';
import { connect } from 'react-redux';
import { fetchQuestion, editQuestion } from '../actions';

class EditQuestion extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onMount(this.props.params.question_id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.question_id !== this.props.params.question_id) {
      this.props.onMount(nextProps.params.question_id);
    }
  }
  handleSubmit(values, dispatch) {
    return dispatch(editQuestion(this.props.params.question_id, values));
  }
  render() {
    const question = this.props.question;
    const initialValues = {
      text: question.text,
      correct: question.correct,
      incorrect: question.incorrect,
    };
    return (
      <QuestionForm
        id={question._id}
        initialValues={initialValues}
        formType="edit"
        title="Edit a question"
        onSubmit={this.handleSubmit}
      />
    );
  }
}
EditQuestion.propTypes = {
  params: React.PropTypes.shape({
    question_id: React.PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.questionForm.isFetching,
  question: state.questionForm.question,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (questionId) => {
    dispatch(fetchQuestion(questionId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
