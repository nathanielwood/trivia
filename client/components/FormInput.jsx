import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

export default class FormInput extends Component {
  constructor() {
    super();
    this.validationState = this.validationState.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }
  validationState(field) {
    if (this.props.submitFailed && field.error) return 'error';
    return null;
  }
  errorMessage(field) {
    if (this.props.submitFailed && field.error) return field.error;
    return null;
  }
  render() {
    return (
      <Input
        key={this.props.key}
        label={this.props.label}
        type={this.props.type}
        labelClassName={this.props.overrideLabelClassName || 'col-xs-3'}
        wrapperClassName={this.props.overrideWrapperClassName || 'col-xs-9'}
        bsStyle={this.validationState(this.props.field)}
        help={this.errorMessage(this.props.field)}
        hasFeedback
        {...this.props.field}
      />
    );
  }
}
FormInput.propTypes = {
  key: PropTypes.number,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  overrideLabelClassName: PropTypes.string,
  overrideWrapperClassName: PropTypes.string,
  field: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool.isRequired,
};
