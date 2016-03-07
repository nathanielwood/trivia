import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import { resetQuestionForm, resetQuestionList, hideAlert } from '../actions';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

class Question extends Component {
  componentWillUnmount() {
    this.props.onReset();
  }
  render() {
    const alert = this.props.alert;
    return (
      <div>
        <h2>Question Database</h2>
        <hr />
        {alert.display &&
          <Alert bsStyle={alert.style} onDismiss={this.props.onDismissAlert}>
            {alert.message}
          </Alert>
        }
        {this.props.children}
        <QuestionList />
      </div>
    );
  }
}
Question.propTypes = {
  onReset: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  children: PropTypes.node,
  alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
  onDismissAlert: () => {
    dispatch(hideAlert());
  },
  onReset: () => {
    dispatch(resetQuestionForm());
    dispatch(resetQuestionList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
