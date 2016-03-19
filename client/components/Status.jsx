// client/components/Status.jsx

import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';

const Status = (props) => {
  let status = '';
  let button = '';
  if (props.status.visible) {
    if (props.status.correct) {
      status = <h3>Correct!</h3>;
    } else {
      status = <h3>Incorrect</h3>;
    }
    button = (
      <Button
        onClick={props.onClick}
        disabled={props.status.disableButton}
      >Next</Button>
    );
  }
  return (
    <div>
      {status}
      {button}
    </div>
  );
};
Status.propTypes = {
  status: PropTypes.shape({
    visible: PropTypes.bool,
    correct: PropTypes.bool,
    disableButton: PropTypes.bool,
  }),
  onClick: PropTypes.func,
};

export default Status;
