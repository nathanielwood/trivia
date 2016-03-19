// client/components/RegisterUsername.jsx

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import { validateUsernameForm } from '../utilities/validations';
import { registerUsername } from '../actions';

const fields = ['username'];

const RegisterUsername = (props) => {
  const submit = (values, dispatch) => (
    dispatch(registerUsername(values))
  );
  const {
    fields: { username },
    handleSubmit,
    submitting,
    submitFailed,
    error,
    user,
  } = props;
  let name;
  if (user.google && user.google.name) {
    name = user.google.name;
  } else if (user.facebook && user.facebook.name) {
    name = user.facebook.name;
  }
  return (
    <div>
      <h3>Register Username</h3>
      {name && <p>Hello {name}, thanks for signing up. Please register a username below:</p>}
      <hr />
      <form className="form-horizontal" onSubmit={handleSubmit(submit)}>
        <ErrorMessage error={error} submitting={submitting} />
        <FormInput
          type="text"
          label="Username"
          submitFailed={submitFailed}
          field={username}
        />
        <ButtonInput
          type="submit"
          disabled={submitting}
          wrapperClassName="col-xs-offset-3 col-xs-9"
          bsStyle="primary"
        />
      </form>
    </div>
  );
};
RegisterUsername.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  submitFailed: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default reduxForm({
  form: 'register-username',
  fields,
  validate: validateUsernameForm,
}, mapStateToProps)(RegisterUsername);
