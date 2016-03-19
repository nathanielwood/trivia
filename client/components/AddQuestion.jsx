// client/components/AddQuestion.jsx

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import QuestionForm from './QuestionForm';
import ErrorMessage from './ErrorMessage';
import { addQuestion } from '../actions';

const AddQuestion = (props) => {
  const handleSubmit = (values, dispatch) => (
    dispatch(addQuestion(values, props.listOptions, props.list.pagination.page))
  );
  if (!props.user.id) {
    return (
      <ErrorMessage error="Please login to add a new question" />
    );
  }
  return (
    <QuestionForm title="Add a question" onSubmit={handleSubmit} />
  );
};
AddQuestion.propTypes = {
  user: PropTypes.object,
  listOptions: PropTypes.object,
  list: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  listOptions: state.questionListOptions,
  list: state.questionList,
});

export default connect(mapStateToProps)(AddQuestion);
