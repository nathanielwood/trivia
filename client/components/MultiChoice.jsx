// client/components/MultiChoice.jsx

import React, { PropTypes } from 'react';
import AnswerButton from './AnswerButton';

const MultiChoice = (props) => {
  const styleButton = (i) => {
    if (props.question.answered) {
      if (i === props.question.correct) return 'success';
      if (i === props.question.selected) return 'danger';
    }
    return 'default';
  };
  const answers = props.question.answers.map((answer, index) => (
    <AnswerButton
      selectAnswer={function selectAnswer() {
        if (!props.question.answered) props.selectAnswer(index);
      }}
      id={index}
      key={index}
      text={answer}
      style={styleButton(index)}
      disabled={props.question.answered}
    />
  ));
  return (
    <div>
      <h4>{props.question.text}</h4>
      {answers}
    </div>
  );
};
MultiChoice.propTypes = {
  question: PropTypes.object,
  selectAnswer: PropTypes.func,
};

export default MultiChoice;
