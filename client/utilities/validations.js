export const validateQuestionForm = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  } else if (values.text.length < 6) {
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
