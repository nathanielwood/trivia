// client/components/EditQuestion.jsx

import React, { Component, PropTypes } from 'react';
import QuestionForm from './QuestionForm';
import ErrorMessage from './ErrorMessage';
import { connect } from 'react-redux';
import { fetchQuestion, editQuestion, removeQuestion } from '../actions';

class EditQuestion extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    return dispatch(editQuestion(
      this.props.params.question_id,
      values,
      this.props.listOptions,
      this.props.list.pagination.page
    ));
  }
  handleRemove(event) {
    event.preventDefault();
    this.props.onRemove(
      this.props.question._id,
      this.props.listOptions,
      this.props.list.pagination.page
    );
  }
  render() {
    const question = this.props.question;
    const user = this.props.user;
    const initialValues = {
      text: question.text,
      correct: question.correct,
      incorrect: question.incorrect,
    };
    if (question.creator && question.creator._id !== user.id) {
      return (
        <ErrorMessage error="You may only edit your own questions" />
      );
    }
    return (
      <QuestionForm
        id={question._id}
        initialValues={initialValues}
        formType="edit"
        title="Edit a question"
        onSubmit={this.handleSubmit}
        onRemove={this.handleRemove}
      />
    );
  }
}
EditQuestion.propTypes = {
  params: React.PropTypes.shape({
    question_id: React.PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  listOptions: PropTypes.object,
  list: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isFetching: state.questionForm.isFetching,
  question: state.questionForm.question,
  user: state.user,
  listOptions: state.questionListOptions,
  list: state.questionList,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (questionId) => {
    dispatch(fetchQuestion(questionId));
  },
  onRemove: (questionId, listOptions, page) => {
    dispatch(removeQuestion(questionId, listOptions, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
