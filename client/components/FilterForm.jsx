// client/components/FilterForm.jsx

import React, { PropTypes } from 'react';
import { Panel, Input, ButtonInput } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import FormInput from './FormInput';

const fields = ['terms', 'username', 'showAnswers'];

const FilterForm = (props) => {
  const {
    fields: { terms, username, showAnswers },
    handleSubmit,
    submitting,
  } = props;
  return (
    <Panel collapsible header={
        <span>Filter&nbsp;&nbsp;<i className="fa fa-caret-down"></i></span>
      }
    >
      <form onSubmit={handleSubmit} className="form-horizontal">
        <FormInput
          type="text"
          label="by Question"
          field={terms}
        />
        <FormInput
          type="text"
          label="by Creator"
          field={username}
        />
        <Input
          type="checkbox"
          label="Show Answers"
          wrapperClassName="col-sm-offset-3 col-sm-9"
          {...showAnswers}
        />
        <ButtonInput
          type="submit"
          wrapperClassName="col-sm-offset-3 col-sm-9"
          disabled={submitting}
          bsStyle="primary"
        >
          Submit
        </ButtonInput>
      </form>
    </Panel>
  );
};
FilterForm.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'question-list-filter',
  fields,
})(FilterForm);
