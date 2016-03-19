// client/components/Login.jsx

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import { validateSigninForm } from '../utilities/validations';
import { loginUser, loginFacebook, loginGoogle } from '../actions';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
require('../../bower_components/bootstrap-social/bootstrap-social.css');

const fields = ['email', 'password'];

class Signin extends Component {
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
    return dispatch(loginUser(values));
  }
  render() {
    const {
      fields: { email, password },
      handleSubmit,
      submitting,
      submitFailed,
      error,
      handleFacebook,
      handleGoogle,
    } = this.props;
    return (
      <div>
        <h3>Login</h3>
        <hr />
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <FacebookLogin onLogin={handleFacebook} />
            <GoogleLogin onLogin={handleGoogle} />
          </div>
        </div>
        <hr />
        <h4 className="text-center">Or sign in by email</h4>
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <ErrorMessage error={error} />
          <FormInput
            type="email"
            label="Email"
            submitFailed={submitFailed}
            field={email}
          />
          <FormInput
            type="password"
            label="Password"
            submitFailed={submitFailed}
            field={password}
          />
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <ButtonToolbar>
                <Button
                  type="submit"
                  disabled={submitting}
                  bsStyle="primary"
                >Submit</Button>
                <Link to="/forgot-password" className="pull-right">Forgot your password?</Link>
              </ButtonToolbar>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
Signin.propTypes = {
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
  form: 'signin',
  fields,
  validate: validateSigninForm,
}, mapStateToProps, mapDispatchToProps)(Signin);
