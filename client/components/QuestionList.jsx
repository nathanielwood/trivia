import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import { fetchQuestions } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';

class QuestionList extends Component {
  componentWillMount() {
    this.props.onMount();
  }
  render() {
    const list = this.props.list;
    if (list.isFetching) {
      return (
        <h2>Loading...</h2>
      );
    }
    return (
      <div>
        <Link to="/question/add">Add a question</Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Created On</th>
              <th>Question Text</th>
              <th>Correct Answer</th>
              <th>Incorrect Answers</th>
            </tr>
          </thead>
          <tbody>
            {list.questions && list.questions.map((question, i) => (
              <tr key={i}>
                <td>{moment(question.createdAt).format('ddd, MMM do, YYYY, h:mm:ssA')}</td>
                <td>{question.text}</td>
                <td>{question.correct.join(', ')}</td>
                <td>{question.incorrect.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
QuestionList.propTypes = {
  onMount: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.questionList,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchQuestions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
