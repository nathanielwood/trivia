// client/utilities/validation.js

import validator from 'validator';

export const validateQuestionForm = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  } else if (!validator.isLength(values.text, { min: 6 })) {
    errors.text = 'Too short';
  }
  if (!values.correct) {
    errors.correct = 'Required';
  }
  let incorrectError = true;
  if (values.incorrect) {
    for (let i = 0; i <= values.incorrect.length; i++) {
      if (values.incorrect[i]) {
        incorrectError = false;
      }
    }
  }
  if (incorrectError) {
    if (!errors.incorrect) errors.incorrect = [];
    errors.incorrect[0] = 'At least one incorrect answer is required';
  }
  return errors;
};

// const validateName = (name, errors) => {
//   const newErrors = errors;
//   const validName = /^[a-z](?!.*\s{2})[ \w.-]{1,29}$/i;
//   if (!name) {
//     newErrors.name = 'Required';
//   } else if (!validator.matches(name, /^[a-z]+/i)) {
//     newErrors.name = 'Name must start with a letter';
//   } else if (!validator.isLength(name, { min: 2, max: 30 })) {
//     newErrors.name = 'Name must be between 2 and 30 characters in length';
//   } else if (!validator.matches(name, validName)) {
//     newErrors.name = 'Acceptable characters include letters, numbers,';
//     newErrors.name += ' periods, dashes, underscores and single spaces';
//   }
//   return newErrors;
// };

const validateEmail = (email, errors) => {
  const newErrors = errors;
  if (!email) {
    newErrors.email = 'Required';
  } else if (!validator.isEmail(email)) {
    newErrors.email = 'Enter a correct email address';
  }
  return newErrors;
};

const validatePassword = (password, errors) => {
  const newErrors = errors;
  if (!password) {
    newErrors.password = 'Required';
  } else if (!validator.isLength(password, { min: 8 })) {
    newErrors.password = 'Passwords must be at least 8 characters long';
  }
  return newErrors;
};

const validateConfirmPassword = (password, confirm, errors) => {
  const newErrors = errors;
  if (password !== confirm) {
    newErrors.confirm = 'Passwords do not match';
  }
  return newErrors;
};

const validateUsername = (username, errors) => {
  const newErrors = errors;
  const validUsername = /^[\w.-]{2,30}$/;
  if (!username) {
    newErrors.username = 'Required';
  } else if (!validator.isLength(username, { min: 2, max: 30 })) {
    newErrors.username = 'Usernames must be between 2 and 30 characters';
  } else if (!validator.matches(username, validUsername)) {
    newErrors.username =
    'Username can only contain letters, numbers, underscores, dashes and periods';
  }
  return newErrors;
};

export const validateUsernameForm = (values) => {
  let errors = {};
  errors = validateUsername(values.username, errors);
  return errors;
};

export const validateRegisterForm = (values) => {
  let errors = {};
  // errors = validateName(values.name, errors);
  errors = validateEmail(values.email, errors);
  errors = validateUsername(values.username, errors);
  errors = validatePassword(values.password, errors);
  errors = validateConfirmPassword(values.password, values.confirm, errors);
  return errors;
};

export const validateSigninForm = (values) => {
  let errors = {};
  errors = validateEmail(values.email, errors);
  errors = validatePassword(values.password, errors);
  return errors;
};

export const validateForgotPasswordForm = (values) => {
  let errors = {};
  errors = validateEmail(values.email, errors);
  return errors;
};

export const validateChangePasswordForm = (values) => {
  let errors = {};
  errors = validatePassword(values.password, errors);
  errors = validateConfirmPassword(values.password, values.confirm, errors);
  return errors;
};
