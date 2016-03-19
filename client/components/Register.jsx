// client/components/Register.jsx

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import { validateRegisterForm } from '../utilities/validations';
import { registerUser, loginFacebook, loginGoogle } from '../actions';

const fields = ['username', 'email', 'password', 'confirm'];

class Register extends Component {
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
    return dispatch(registerUser(values));
  }
  render() {
    const {
      fields: { username, email, password, confirm },
      handleSubmit,
      submitting,
      submitFailed,
      error,
      handleFacebook,
      handleGoogle,
    } = this.props;
    return (
      <div>
        <h3>Register an account</h3>
        <hr />
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <FacebookLogin onLogin={handleFacebook} />
            <GoogleLogin onLogin={handleGoogle} />
          </div>
        </div>
        <hr />
        <h4 className="text-center">Or register by email</h4>
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <ErrorMessage error={error} />
          <FormInput
            type="email"
            label="Email"
            submitFailed={submitFailed}
            field={email}
          />
          <FormInput
            type="text"
            label="Username"
            submitFailed={submitFailed}
            field={username}
          />
          <FormInput
            type="password"
            label="Password"
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
Register.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  submitFailed: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
  handleFacebook: PropTypes.func,
  handleGoogle: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFacebook: (values) => {
    dispatch(loginFacebook(values));
  },
  handleGoogle: (values) => {
    dispatch(loginGoogle(values));
  },
});

export default reduxForm({
  form: 'register',
  fields,
  validate: validateRegisterForm,
}, mapStateToProps, mapDispatchToProps)(Register);
