// client/components/FormInput.jsx

import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

const FormInput = (props) => {
  const validationState = () => {
    if (props.submitFailed && props.field.error) return 'error';
    return null;
  };
  const errorMessage = () => {
    if (props.submitFailed && props.field.error) return props.field.error;
    return null;
  };
  return (
    <Input
      key={props.key}
      label={props.label}
      type={props.type}
      labelClassName={props.overrideLabelClassName || 'col-xs-12 col-sm-3'}
      wrapperClassName={props.overrideWrapperClassName || 'col-xs-12 col-sm-9'}
      bsStyle={validationState()}
      help={errorMessage()}
      hasFeedback
      {...props.field}
    />
  );
};
FormInput.propTypes = {
  key: PropTypes.number,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  overrideLabelClassName: PropTypes.string,
  overrideWrapperClassName: PropTypes.string,
  field: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool,
};

export default FormInput;
