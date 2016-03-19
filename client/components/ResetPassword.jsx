// client/components/ResetPassword.jsx

import React, { Component, PropTypes } from 'react';
import { Alert, ButtonInput } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { validateForgotPasswordToken, resetPassword } from '../actions';
import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import { validateChangePasswordForm } from '../utilities/validations';

const fields = ['password', 'confirm'];

class ResetPassword extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    if (this.props.user.id) {
      browserHistory.push('/');
    }
    const { query } = this.props.location;
    if (query && query.token) {
      this.props.onMount(query.token);
    }
  }
  submit(values, dispatch) {
    return dispatch(resetPassword(values, this.props.location.query.token));
  }
  render() {
    const resetStatus = this.props.resetStatus;
    if (resetStatus.isFetching) {
      return <h3>Loading...</h3>;
    }
    if (!resetStatus.validToken) {
      return (
        <div>
          <Alert bsStyle="danger">
            Sorry, your reset token is invalid or has expired
          </Alert>
          <Link to="/forgot-password">Send a new link</Link>
        </div>
      );
    }
    if (resetStatus.passwordChanged) {
      return (
        <div>
          <Alert bsStyle="success">
            Your password has successfully changed.
            You may now sign in to your account with your new password.
          </Alert>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
    const {
      fields: { password, confirm },
      handleSubmit,
      submitFailed,
      submitting,
      error,
    } = this.props;
    return (
      <div>
        <h3>Reset your password</h3>
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <ErrorMessage error={error} />
          <FormInput
            type="password"
            label="New Password"
            submitFailed={submitFailed}
            field={password}
          />
          <FormInput
            type="password"
            label="Confirm Password"
            submitFailed={submitFailed}
            field={confirm}
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
ResetPassword.propTypes = {
  onMount: PropTypes.func,
  location: PropTypes.object,
  resetStatus: PropTypes.object,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitFailed: PropTypes.bool,
  submitting: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  resetStatus: state.resetPassword,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (token) => {
    dispatch(validateForgotPasswordToken(token));
  },
});

export default reduxForm({
  form: 'reset-password',
  fields,
  validate: validateChangePasswordForm,
}, mapStateToProps, mapDispatchToProps)(ResetPassword);
