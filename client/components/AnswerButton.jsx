import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class AnswerButton extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.selectAnswer(this.props.id);
  }
  render() {
    return (
      <Button
        onClick={this.onClick}
        bsSize="large"
        bsStyle={this.props.style}
        disabled={this.props.disabled}
        block
      >
        {this.props.text}
      </Button>
    );
  }
}
AnswerButton.propTypes = {
  selectAnswer: React.PropTypes.func,
  text: React.PropTypes.string,
  id: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  style: React.PropTypes.string,
};
