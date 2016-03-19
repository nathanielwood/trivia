// client/components/ErrorMessage.jsx

import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = (props) => {
  if (props.error && !props.submitting) {
    return (
      <Alert bsStyle="danger">
        {props.error}
      </Alert>
    );
  }
  return <div></div>;
};
ErrorMessage.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool,
};

export default ErrorMessage;
