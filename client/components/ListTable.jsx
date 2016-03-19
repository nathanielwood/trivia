// client/components/ListTable.jsx

import React, { PropTypes } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';

const ListTable = (props) => {
  const { list, showAnswers, handlePageChange, userId } = props;
  const authorizeEdit = (question) => {
    if (question.creator && question.creator._id === userId) {
      return <Link to={`/question/edit/${question.id}`}>Edit</Link>;
    }
    return '';
  };
  const showProp = (question, prop) => {
    if (question[prop]) {
      return question[prop].join(', ');
    }
    return '';
  };
  if (list.isFetching) {
    return (
      <h2>Loading...</h2>
    );
  }
  return (
    <div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Last Updated</th>
            <th>Creator</th>
            <th>Question</th>
            {showAnswers && <th>Correct Answer</th>}
            {showAnswers && <th>Incorrect Answers</th>}
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
              <td>{question.creator && question.creator.username}</td>
              <td>{question.text}</td>
              {showAnswers && <td>{showProp(question, 'correct')}</td>}
              {showAnswers && <td>{showProp(question, 'incorrect')}</td>}
              <td>{authorizeEdit(question)}</td>
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
        onSelect={handlePageChange}
      />
    </div>
  );
};
ListTable.propTypes = {
  list: PropTypes.object.isRequired,
  showAnswers: PropTypes.bool,
  handlePageChange: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default ListTable;
