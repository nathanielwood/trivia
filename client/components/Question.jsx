import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import { resetQuestionForm, resetQuestionList } from '../actions';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

class Question extends Component {
  componentWillUnmount() {
    this.props.onReset();
  }
  render() {
    return (
      <div>
        <h2>Questions</h2>
        <hr />
        {this.props.questionAddSuccess &&
          <Alert bsStyle="success" onDismiss={this.props.onReset}>
            Question added
          </Alert>
        }
        {!this.props.showForm &&
          <QuestionList />
        }
        {this.props.children}
      </div>
    );
  }
}
Question.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node,
  questionAddSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showForm: state.questionForm.showForm,
  questionAddSuccess: state.questionForm.questionAddSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onReset: () => {
    dispatch(resetQuestionForm());
    dispatch(resetQuestionList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
