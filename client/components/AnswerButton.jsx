// client/components/AnswerButton.jsx

import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const AnswerButton = (props) => (
  <Button
    onClick={function onClick() { props.selectAnswer(props.id); }}
    style={{ whiteSpace: 'normal' }}
    bsSize="large"
    bsStyle={props.style}
    disabled={props.disabled}
    block
  >
    {props.text}
  </Button>
);
AnswerButton.propTypes = {
  selectAnswer: PropTypes.func,
  id: PropTypes.number,
  style: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,
};

export default AnswerButton;
