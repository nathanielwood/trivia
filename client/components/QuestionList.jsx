// client/components/QuestionList.jsx

import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { fetchQuestions, setFilterOptions } from '../actions';
import { connect } from 'react-redux';
import FilterForm from './FilterForm';
import ListTable from './ListTable';

class QuestionList extends Component {
  constructor() {
    super();
    this.handlePageChange = this.handlePageChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onGetList();
  }
  handlePageChange(event, selectedEvent) {
    event.preventDefault();
    const page = selectedEvent.eventKey;
    const options = this.props.options;
    this.props.onGetList(options, page);
  }
  formSubmit(values) {
    return new Promise((resolve) => {
      const options = Object.assign({}, values);
      this.props.onGetList(options);
      this.props.onFilterChange(options);
      resolve();
    });
  }
  render() {
    return (
      <div>
        <LinkContainer to={{ pathname: '/question/add' }} style={{ margin: '10px 0px' }}>
          <Button type="button">Add a question</Button>
        </LinkContainer>
        <FilterForm onSubmit={this.formSubmit} />
        <ListTable
          list={this.props.list}
          showAnswers={this.props.options.showAnswers}
          handlePageChange={this.handlePageChange}
          userId={this.props.user.id}
        />
      </div>
    );
  }
}
QuestionList.propTypes = {
  onGetList: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  options: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  list: state.questionList,
  options: state.questionListOptions,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetList: (options, page) => {
    dispatch(fetchQuestions(options, page));
  },
  onFilterChange: (options) => {
    dispatch(setFilterOptions(options));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
