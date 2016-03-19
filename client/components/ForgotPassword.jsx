// client/components/ForgotPassword.jsx

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Alert, ButtonInput } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import { forgotPassword } from '../actions';
import { validateForgotPasswordForm } from '../utilities/validations';

const fields = ['email'];

class ForgotPassword extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    if (this.props.user.id) {
      browserHistory.push('/');
    }
  }
  submit(values, dispatch) {
    return dispatch(forgotPassword(values));
  }
  render() {
    if (this.props.alert.display) {
      return (
        <Alert bsStyle={this.props.alert.style}>
          {this.props.alert.message}
        </Alert>
      );
    }
    const {
      fields: { email },
      handleSubmit,
      submitting,
      submitFailed,
      error,
    } = this.props;
    return (
      <div>
        <h3>Reset Password</h3>
        <hr />
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <ErrorMessage error={error} />
          <FormInput
            type="email"
            label="Email"
            submitFailed={submitFailed}
            field={email}
          />
          <ButtonInput
            type="submit"
            disabled={submitting}
            bsStyle="primary"
            wrapperClassName="col-sm-offset-3 col-sm-9"
          >Submit</ButtonInput>
        </form>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  user: PropTypes.object,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  submitFailed: PropTypes.bool,
  error: PropTypes.string,
  alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  alert: state.alert,
});

export default reduxForm({
  form: 'forgot-password',
  fields,
  validate: validateForgotPasswordForm,
}, mapStateToProps)(ForgotPassword);
