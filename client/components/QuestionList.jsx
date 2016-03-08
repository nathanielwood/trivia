import React, { Component, PropTypes } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router';
import { fetchQuestions } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';

class QuestionList extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    this.props.onGetList();
  }
  handleSelect(event, selectedEvent) {
    event.preventDefault();
    this.props.onGetList(selectedEvent.eventKey);
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
              <th>Last Updated</th>
              <th>Question Text</th>
              <th>Correct Answer</th>
              <th>Incorrect Answers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.questions && list.questions.map((question, i) => (
              <tr key={i}>
                <td>
                  {
                    moment(question.updatedAt, moment.ISO_8601)
                    .format('YYYY-MM-DD HH:mm:ss')
                  }
                </td>
                <td>{question.text}</td>
                <td>{question.correct.join(', ')}</td>
                <td>{question.incorrect.join(', ')}</td>
                <td><Link to={`/question/edit/${question.id}`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          className="pull-right"
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={list.pagination && list.pagination.pages}
          maxButtons={5}
          activePage={list.pagination && parseInt(list.pagination.page, 10)}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}
QuestionList.propTypes = {
  onGetList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.questionList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetList: (page) => {
    dispatch(fetchQuestions(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
