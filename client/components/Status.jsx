import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Status extends Component {
  render() {
    let status = '';
    let button = '';
    if (this.props.status.visible) {
      if (this.props.status.correct) {
        status = <h3>Correct!</h3>;
      } else {
        status = <h3>Incorrect</h3>;
      }
      button = (
        <Button
          onClick={this.props.onClick}
          disabled={this.props.status.disableButton}
        >Next</Button>
      );
    }
    return (
      <div>
        {status}
        {button}
      </div>
    );
  }
}
Status.propTypes = {
  status: React.PropTypes.shape({
    visible: React.PropTypes.bool,
    correct: React.PropTypes.bool,
    disableButton: React.PropTypes.bool,
  }),
  onClick: React.PropTypes.func,
};
